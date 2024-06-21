import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate, cleanFilter } from "./ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    return ApiRequestTemplate(
        req,
        res,
        Manager().Shop,
        [
            {
                model: Manager().Business.model, as: 'businesses'
            }
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const config = (await Manager().Shop.create({
                        name: req.body.name,
                        description: req.body.description,
                        canRemove: req.body.canRemove
                    }, { transaction: t })).query

                    await config.setBusinesses(req.body.businessId, { transaction: t });
                    res.status(200).json(config)
                })
            }
            catch (e) {
                console.log(e)
                res.status(500).json({})
            }
        }
    )

}
