import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    try {
        // TODO: Sincronizando cosas

        const bus = (await Manager().Business.findAll()).query
        if (bus.length == 0) {
            // Este proceso es para simular datos que se deben obtener de la sincronizacion
            let shop1 = null as any
            let shop2 = null as any
            let shop3 = null as any
            await sequelize.transaction(async (t) => {
                // Creando tienda
                shop1 = (await Manager().Shop.create({
                    name: "Almacen",
                    description: "Almacen del negocio"
                }, { transaction: t })).query
                shop2 = (await Manager().Shop.create({
                    name: "Frio Plus SHOP Lisa",
                    description: "Tienda ubicada en la Lisa"
                }, { transaction: t })).query
                shop3 = (await Manager().Shop.create({
                    name: "Frio Plus SHOP Marianao",
                    description: "Tienda ubicada en Marianao"
                }, { transaction: t })).query

                // Creando negocio
                const business = (await Manager().Business.create({
                    name: "Frio Plus",
                    code: "4545"
                }, { transaction: t })).query
                await business.setShops([shop1.dataValues.id, shop2.dataValues.id, shop3.dataValues.id], { transaction: t });

                // Creando role admin
                const role = (await Manager().Role.create({
                    name: "admin",
                    view_dashboard: true,
                    perms_dashboard: "{}",
                    view_inventory: true,
                    perms_inventory: "{}",
                    view_transit: true,
                    perms_transit: "{}",
                    view_orders: true,
                    perms_orders: "{}",
                    view_finance: true,
                    perms_finance: "{}",
                    view_sales: true,
                    perms_sales: "{}",
                    view_box: true,
                    perms_box: "{}"
                }, { transaction: t })).query

                // Creando unidad
                const unidad = (await Manager().Unit.create({
                    canRemove: false,
                    name: "Unidad",
                    symbol: "U",
                    businessId: business.dataValues.id
                }, { transaction: t })).query
                
            })


        }
        else
            console.log("ya inicilizado")


        res.status(200).json({
            details: "Inicializacion perfecta"
        })
    }
    catch (e) {
        console.log("error", e)
        res.status(400).json({
            details: ""
        })
    }
}
