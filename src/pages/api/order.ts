import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "../ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    return ApiRequestTemplate(
        req,
        res,
        Manager().Order,
        [
            {
                model: Manager().MessagingData.model, as: 'messaging_data'
            },
            {
                model: Manager().StorePickUpData.model, as: 'store_pickup_data'
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
                    const config = (await Manager().Order.create({
                        order_id: req.body.order_id,
                        type: req.body.type,
                        messaging_data_id: req.body.messaging_data_id,
                        store_pickup_data_id: req.body.store_pickup_data_id,
                        amortized: req.body.amortized,
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
