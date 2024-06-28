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
        Manager().OfferRule,
        [
            {
                model: Manager().Configuration.model, as: 'configurations1'
            },
            {
                model: Manager().Configuration.model, as: 'configurations2'
            },
            {
                model: Manager().PaymentRule.model, as: 'paymentrule1'
            },
            {
                model: Manager().PaymentRule.model, as: 'paymentrule2'
            },
            {
                model: Manager().PaymentRule.model, as: 'paymentrule3'
            },
            {
                model: Manager().PaymentRule.model, as: 'paymentrule4'
            },
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const offer = (await Manager().OfferRule.create({
                        comparative_symbol: req.body.comparative_symbol,
                        value: req.body.value,
                        percentage: req.body.percentage
                    }, { transaction: t })).query

                    const { anchor_in } = req.body
                    if (anchor_in == 1)
                        await offer.setConfigurations1(req.body.configurations_id, { transaction: t });
                    else if (anchor_in == 2)
                        await offer.setConfigurations2(req.body.configurations_id, { transaction: t });
                    else if (anchor_in == 3)
                        await offer.setPaymentrule1(req.body.paymentruleId, { transaction: t });
                    else if (anchor_in == 4)
                        await offer.setPaymentrule2(req.body.paymentruleId, { transaction: t });
                    else if (anchor_in == 5)
                        await offer.setPaymentrule3(req.body.paymentruleId, { transaction: t });
                    else if (anchor_in == 6)
                        await offer.setPaymentrule4(req.body.paymentruleId, { transaction: t });

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
