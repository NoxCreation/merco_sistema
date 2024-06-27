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
        Manager().OfferRule, [
        {
            model: Manager().Configuration.model, as: 'configurations'
        }
    ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const offer = (await Manager().OfferRule.create({
                        comparative_symbol: req.body.comparative_symbol,
                        value: req.body.value,
                        percentage: req.body.percentage
                    }, { transaction: t })).query

                    if (req.body.isOffersRules)
                        await offer.setConfigurations1(req.body.configurations_id, { transaction: t });
                    else
                        await offer.setConfigurations2(req.body.configurations_id, { transaction: t });
                    res.status(200).json(offer)
                })
            }
            catch (e) {
                console.log(e)
                res.status(500).json({})
            }
        }
    )

}
