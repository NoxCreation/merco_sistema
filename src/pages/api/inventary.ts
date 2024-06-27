import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    // Si se va a agregar un nuevo produto al inventario, se comprueba que ya no exista.
    if (req.method == "POST") {
        const { productId, businessId, shopId } = req.body
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
        const { historyId, value, coinId, userId, shopId, productId, businessId } = req.body
        const vc = (await (await Manager().ValueCoin).create({
            "value": value,
            "coinId": coinId
        })).toJSON()
        req.body.priceId = vc.id

        setHistory(historyId, userId, "create", shopId, productId, "Agrego de nuevo producto", businessId)
    }

    if(req.method == "DELETE"){
        const { userId, shopId, productId, businessId, historyId } = req.body
        setHistory(historyId, userId, "delete", shopId, productId, "Eliminando producto", businessId)
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

export const setHistory = async (historyId: string, userId: number, action: string, shopToId: number, productId: number, description: string, businessId: number) => {
    const r = (await (await Manager().InventaryHistory).create({
        historyId: historyId,
        userId,
        action,
        shopToId,
        productId,
        description,
        businessId
    })).query
}
