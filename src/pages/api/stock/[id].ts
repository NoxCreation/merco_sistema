import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    try {
        const { id } = req.query
        const stock = (await Manager().Stock.findOneById(parseInt(id as string), {
        })).toJSON()
        if (stock == null)
            res.status(400).json({
                'details': "Este producto no existe"
            })

        res.status(200).json(stock)
    }
    catch {
        res.status(500).json({})
    }

}
