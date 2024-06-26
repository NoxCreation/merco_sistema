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
        Manager().Configuration,
        [
            {
                model: Manager().OfferRule.model, as: 'offers_rules'
            },
            {
                model: Manager().OfferRule.model, as: 'payment_results'
            },
            {
                model: Manager().PaymentRule.model, as: 'paymentrule', include: [
                    {
                        model: Manager().OfferRule.model, as: 'data_by_quantity_sponser'
                    },
                    {
                        model: Manager().OfferRule.model, as: 'data_by_quantity_seller'
                    },
                    {
                        model: Manager().OfferRule.model, as: 'data_by_quantity_sponser_fixed_payment'
                    },
                    {
                        model: Manager().OfferRule.model, as: 'data_by_quantity_seller_fixed_payment'
                    }
                ]
            },
            {
                model: Manager().SMSHistory.model, as: 'sms_history', include: [
                    {
                        model: Manager().User.model, as: 'user'
                    },
                    {
                        model: Manager().Employee.model, as: 'employee'
                    }
                ]
            }
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const config = (await Manager().Configuration.create({
                        administrative_payments: req.body.administrative_payments,
                        re_investment: req.body.re_investment,
                    }, { transaction: t })).query

                    await config.setCoins(req.body.coinsId, { transaction: t });
                    await config.setOffers_rules(req.body.offers_rules_id, { transaction: t });
                    await config.setPayment_rules(req.body.payment_rules_id, { transaction: t });
                    await config.setSms_history(req.body.sms_history_id, { transaction: t });
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
