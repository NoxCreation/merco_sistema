import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    try {
        const { id } = req.query
        const unit = (await Manager().Employee.findOneById(parseInt(id as string), {
            include: [
                {
                    model: Manager().Shop.model, as: 'shop'
                },
                {
                    model: Manager().ChargeEmployee.model, as: 'chargeemployee'
                }
            ]
        })).toJSON()
        if (unit == null)
            res.status(400).json({
                'details': "Este producto no existe"
            })

        res.status(200).json(unit)
    }
    catch {
        res.status(500).json({})
    }

}
