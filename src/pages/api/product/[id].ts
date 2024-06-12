import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    try {
        const { id } = req.query
        const product = (await Manager().Product.findOneById(parseInt(id as string), {
            include: [
                {
                    model: Manager().Category.model, as: 'category'
                },
                {
                    model: Manager().Unit.model, as: 'unit'
                },
            ]
        })).toJSON()
        if (product == null)
            res.status(400).json({
                'details': "Este producto no existe"
            })

        res.status(200).json(product)
    }
    catch {
        res.status(500).json({})
    }

}
