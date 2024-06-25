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
        Manager().CardAccount,
        [
            {
                model: Manager().HistoryCardAccount.model, as: 'historycardaccount'
            },
            {
                model: Manager().Coin.model, as: 'coin'
            }
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const card = (await Manager().CardAccount.create({
                        name: req.body.name,
                        code: req.body.code,
                        value: req.body.value,
                        limit: req.body.limit,
                        coinId: req.body.coinId,
                        flexibility: req.body.flexibility,
                        percent_flexibility: req.body.percent_flexibility,
                        businessId: req.body.businessId,
                    }, { transaction: t })).query
                    await card.setHistorycardaccount(req.body.historyId, { transaction: t });

                    res.status(200).json(card)
                })
            }
            catch (e) {
                console.log("error", e)
                res.status(500).json({})
            }
        }
    )

}
