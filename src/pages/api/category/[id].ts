import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    try {
        const { id } = req.query
        const category = (await Manager().Category.findOneById(parseInt(id as string), {})).toJSON()
        if (category == null)
            res.status(400).json({
                'details': "Este producto no existe"
            })

        res.status(200).json(category)
    }
    catch {
        res.status(500).json({})
    }

}
