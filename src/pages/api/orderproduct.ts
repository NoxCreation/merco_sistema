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
        Manager().OrderProduct,
        [
            {
                model: Manager().Product.model, as: 'product'
            },
            {
                model: Manager().ValueCoin.model, as: 'prices'
            },
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const config = (await Manager().OrderProduct.create({
                        productId: req.body.productId,
                        count: req.body.count,
                    }, { transaction: t })).query

                    await config.setPrices(req.body.prices, { transaction: t });
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
