import { Manager } from "@/backend/models/engine";
import { InventaryType } from "@/backend/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { setHistory } from "./inventary";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    if (req.method == "POST") {
        const { shopId, userId, inventary_relocation, description, historyId, businessId } = req.body

        inventary_relocation.forEach(async (relocation: { inventaryId: number, stock: number }) => {
            // Obtiene el inventario del almacen
            const inventary = (await (await Manager().Inventary).findOneById(relocation.inventaryId, {
                include: [
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
            })).query.dataValues as InventaryType

            // Cuando es todo el inventario
            if (inventary.stock == relocation.stock) {
                // Crea o actualiza el inventario para la tienda

                //1. Comprueba que la tienda ya tenga este producto en inventario
                const r2 = await (await (await Manager().Inventary).findOne({
                    where: {
                        productId: inventary.productId,
                        shopId: shopId
                    }
                })).query

                //2. Si no tiene el producto en inventario
                if (r2 == null) {
                    const r3 = (await (await Manager().Inventary).update(relocation.inventaryId, {
                        shopId
                    })).query
                }
                //3. Si ya tiene el producto en inventario
                else {
                    const r3 = (await (await Manager().Inventary).update(r2.dataValues.id, {
                        stock: r2.dataValues.stock + relocation.stock
                    })).query

                    const r4 = (await (await Manager().Inventary)).delete(inventary.id)
                }


            }
            // El inventario esta fraccionado
            else {
                // actualiza la cantidad del almacen
                const r = (await (await Manager().Inventary).update(relocation.inventaryId, {
                    stock: inventary.stock - relocation.stock
                })).query

                // Crea o actualiza el inventario para la tienda

                //1. Comprueba que la tienda ya tenga este producto en inventario
                const r2 = await (await (await Manager().Inventary).findOne({
                    where: {
                        productId: inventary.productId,
                        shopId: shopId
                    }
                })).query

                //2. Si no tiene el producto en inventario
                if (r2 == null) {
                    const vc = (await (await Manager().ValueCoin).create({
                        "value": inventary.valuecoin.value,
                        "coinId": inventary.valuecoin.coinId
                    })).toJSON()

                    const r3 = (await (await Manager().Inventary).create({
                        priceId: vc.id,
                        productId: inventary.productId,
                        stock: relocation.stock,
                        shopId,
                        businessId: inventary.businessId
                    })).query
                }
                //3. Si ya tiene el producto en inventario
                else {
                    const r3 = (await (await Manager().Inventary).update(r2.dataValues.id, {
                        stock: r2.dataValues.stock + relocation.stock
                    })).query
                }
            }

            setHistory(historyId, userId, "traslate", shopId, inventary.productId, description, businessId)
        })

        return res.status(200).json({})
    }
}
