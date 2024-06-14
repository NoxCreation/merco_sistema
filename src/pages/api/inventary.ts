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
        Manager().Inventary,
        [
            {
                model: Manager().ValueCoin.model, as: 'valuecoin', include: [
                    {
                        model: Manager().Coin.model, as: 'coin'
                    }
                ]
            },
            {
                model: Manager().Product.model, as: 'product'
            },
            {
                model: Manager().Stock.model, as: 'stocks'
            }
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const inventary = (await Manager().Inventary.create({
                        productId: req.body.productId,
                        priceId: req.body.priceId,
                    }, { transaction: t })).query
                    await inventary.setStocks(req.body.stocksId, { transaction: t });
                    res.status(200).json(inventary)
                })
            }
            catch (e){
                console.log(e)
                res.status(500).json({})
            }
        }
    )



}
