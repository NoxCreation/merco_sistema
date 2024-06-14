import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    try {
        const { id } = req.query
        const inventary = (await Manager().Inventary.findOneById(parseInt(id as string), {
            include: [
                {
                    model: Manager().Product.model, as: 'product'
                },
                {
                    model: Manager().ValueCoin.model, as: 'valuecoin'
                },
                {
                    model: Manager().Stock.model, as: 'stock'
                },
            ]
        })).toJSON()
        if (inventary == null)
            res.status(400).json({
                'details': "Este producto no existe"
            })

        res.status(200).json(inventary)
    }
    catch {
        res.status(500).json({})
    }

}
