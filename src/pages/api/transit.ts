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
        Manager().Transit,
        [
            {
                model: Manager().MessagingData.model, as: 'messaging_data'
            },
            {
                model: Manager().DebtData.model, as: 'debtdata'
            },
            {
                model: Manager().Order.model, as: 'order'
            },
            {
                model: Manager().Sale.model, as: 'sales'
            },
            {
                model: Manager().OrderProduct.model, as: 'products'
            },
            {
                model: Manager().ValueCoin.model, as: 'amount'
            },
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const config = (await Manager().Transit.create({
                        transit_id: req.body.transit_id,
                        type: req.body.type,
                        messaging_data_id: req.body.messaging_data_id,
                        debt_data_id: req.body.debt_data_id,
                        delivery_date: req.body.delivery_date,
                        amortized: req.body.amortized,
                        orderId: req.body.orderId,
                        saleId: req.body.saleId,
                    }, { transaction: t })).query

                    await config.setProducts(req.body.products, { transaction: t });
                    await config.setAmount(req.body.amount, { transaction: t });
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
