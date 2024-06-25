import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    return ApiRequestTemplate(
        req,
        res,
        Manager().Business,
        [
            {
                model: Manager().Shop.model, as: 'shops', include: [
                    {
                        model: Manager().Business.model, as: 'businesses'
                    }
                ]
            }
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const business = (await Manager().Business.create({
                        name: req.body.name,
                    }, { transaction: t })).query
                    await business.setShops(req.body.shopsId, { transaction: t });

                    res.status(200).json(business)
                })
            }
            catch (e) {
                console.log("error", e)
                res.status(500).json({})
            }
        }
    )


}
