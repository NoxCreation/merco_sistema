import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    try {
        const { id } = req.query
        const valuecoin = (await Manager().ValueCoin.findOneById(parseInt(id as string), {
            include: [
                {
                    model: Manager().Coin.model, as: 'coin'
                },
            ]
        })).toJSON()
        if (valuecoin == null)
            res.status(400).json({
                'details': "Este producto no existe"
            })

        res.status(200).json(valuecoin)
    }
    catch {
        res.status(500).json({})
    }

}
