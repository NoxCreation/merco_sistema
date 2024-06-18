import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";
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
    if (req.method == "GET" || req.method == "DELETE") {
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
    }
    else if (req.method == "POST" || req.method == "PUT") {
        console.log("ee")
        return upload(req as any, res as any, function (err: any) {
            if (req.method == "POST") {
                if (err instanceof multer.MulterError) {
                    console.log("A")
                    return res.status(500).json({ error: err.message });
                } else if (err) {
                    console.log("B", err)
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

}
