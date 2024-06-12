import { PAGESIZE } from "@/backend/models/VARS";
import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == "GET") {
        let _page = 1
        let _pageSize = PAGESIZE
        const { page, pageSize } = req.query;
        if (page != undefined)
            _page = parseInt(page as string)
        if(pageSize != undefined)
            _pageSize = parseInt(pageSize as string)
        const products = (await Manager().Product.findAll({
            limit: _pageSize,
            offset: (_page - 1) * _pageSize,
            include: [
                {
                    model: Manager().Category.model, as: 'category'
                },
                {
                    model: Manager().Unit.model, as: 'unit'
                },
            ]
        })).toJSON()

        res.status(200).json({
            page: _page,
            pageSize: _pageSize,
            data: products
        })
    }
    else if (req.method == "POST") {

        const {
            image,
            code,
            name,
            categoryId,
            unitId,
            coste_usd,
            price_usd,
            count_unit,
            gain_rate,
            rate_seller,
            rate_sponsor,
            barcode
        } = req.body
        try {
            await sequelize.transaction(async (t) => {
                const product = (await Manager().Product.create({
                    image,
                    code,
                    name,
                    categoryId,
                    unitId,
                    coste_usd,
                    price_usd,
                    count_unit,
                    gain_rate,
                    rate_seller,
                    rate_sponsor,
                    barcode
                }, { transaction: t })).toJSON()
                res.status(200).json(product)
            })
        }
        catch {
            res.status(500).json({})
        }
    }
    else if (req.method == "DELETE") {
        const { id } = req.query
        if (id != null) {
            const product = (await Manager().Product.delete(parseInt(id as string))).toJSON()
            res.status(200).json(product)
        }
        else{
            res.status(400).json({
                'details': "Debe indicar el id del elemento a eliminar."
            })
        }
    }
    else if (req.method == "PUT") {
        const { id } = req.query
        if (id != null) {
            const product = (await Manager().Product.update(parseInt(id as string), req.body)).toJSON()
            res.status(200).json(product)
        }
        else{
            res.status(400).json({
                'details': "Debe indicar el id del elemento a actualizar."
            })
        }
    }
    else {
        res.status(400).json({
            'details': "Método no permitido"
        })
    }

}
