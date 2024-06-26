import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    // Si se va a agregar un nuevo produto al inventario, se comprueba que ya no exista.
    if (req.method == "POST") {
        const { productId, businessId, shopId} = req.body
        const exist = (await (await Manager().Inventary).findOne({
            where: {
                productId,
                businessId,
                shopId
            }
        })).query
        if (exist)
            return res.status(400).json({
                'details': "El producto ya se ha agregado al stock."
            })
    }

    // Si se está agregando un nuevo producto al stock, crea un valor nuevo
    if (req.method == "POST") {
        const { value, coinId } = req.body
        const vc = (await (await Manager().ValueCoin).create({
            "value": value,
            "coinId": coinId
        })).toJSON()
        console.log(vc)
        req.body.priceId = vc.id
    }

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
                model: Manager().Product.model, as: 'product', include: [
                    {
                        model: Manager().Category.model, as: 'category'
                    },
                    {
                        model: Manager().Unit.model, as: 'unit'
                    }
                ]
            }
        ]
    )

}
