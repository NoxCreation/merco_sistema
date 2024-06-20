import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate, cleanFilter } from "./ApiRequestTemplate";
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import fs from 'fs';

// Configura multer para guardar los archivos en public/product y usar un nombre de archivo aleatorio
const storage = multer.diskStorage({
    destination: resolve(process.cwd(), 'public', 'products'),
    filename: (req, file, cb: any) => {
        crypto.randomBytes(16, (err, res) => {
            if (err) return cb(err);
            return cb(null, res.toString('hex') + extname(file.originalname));
        });
    },
});

const upload = multer({ storage }).single('file');

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    try {
        if (req.method == "DELETE") {
            const { id } = req.query
            const image_path = (await Manager().Product.findOneById(parseInt(id as any))).query.image
            const filePath = resolve(process.cwd(), 'public', image_path.split("/")[1], image_path.split("/")[2]);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                }
            });
        }
        else if (req.method == "POST" || req.method == "PUT") {
            return upload(req as any, res as any, function (err: any) {
                if (req.method == "POST") {
                    if (err instanceof multer.MulterError) {
                        return res.status(500).json({ error: err.message });
                    } else if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    req.body.image = `/products/${(req as any).file.filename}`
                }
                else if (req.method == "PUT") {
                    const file = (req as any).file
                    if (file) {
                        // elimina la imagen anterior
                        const filePath = resolve(process.cwd(), 'public', req.body.image.split("/")[1], req.body.image.split("/")[2]);
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error('Error al eliminar el archivo:', err);
                            }
                        });
                        req.body.image = `/products/${(req as any).file.filename}`
                    }
                }

                return ApiRequestTemplate(
                    req,
                    res,
                    Manager().Product,
                    [
                        {
                            model: Manager().Category.model, as: 'category'
                        },
                        {
                            model: Manager().Unit.model, as: 'unit'
                        },
                        {
                            model: Manager().Business.model, as: 'business'
                        },
                    ]
                )
            });
        }

        let fcategory = {} as any
        if (req.method == "GET") {
            const { filter } = req.query;
            let _filter = JSON.parse(filter as string)['relations']
            fcategory = _filter ? _filter.category : {}
            console.log("fcategory", fcategory)
            for (let key in fcategory) {
                fcategory = cleanFilter(fcategory, key)
            }
        }

        return ApiRequestTemplate(
            req,
            res,
            Manager().Product,
            [
                {
                    model: Manager().Category.model, as: 'category', where: { ...fcategory }
                },
                {
                    model: Manager().Unit.model, as: 'unit'
                },
                {
                    model: Manager().Business.model, as: 'business'
                },
            ]
        )
    }
    catch (e) {
        return res.status(500).json({
            'details': e
        })
    }


}
