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
                    description: "Almacen del negocio",
                    canRemove: false
                }, { transaction: t })).query
                shop2 = (await Manager().Shop.create({
                    name: "Frio Plus SHOP Lisa",
                    description: "Tienda ubicada en la Lisa",
                    canRemove: true
                }, { transaction: t })).query
                shop3 = (await Manager().Shop.create({
                    name: "Frio Plus SHOP Marianao",
                    description: "Tienda ubicada en Marianao",
                    canRemove: true
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
                    canRemove: false,
                    view_dashboard: true,
                    perms_dashboard: JSON.stringify({
                        view_profits: true,
                        view_fixed_costs: true,
                        view_import_amount: true,
                        view_investment: true,
                        view_sponser_earnings: true,
                        view_seller_earnings: true,
                        view_product_quantity: true,
                        view_total_promoters: true,
                        view_total_sellers: true,
                        view_earnings_by_sponsers: true,
                        view_earnings_by_sellers: true,
                        view_investments_by_day: true,
                        view_earnings_by_day: true
                    }),
                    view_inventory: true,
                    perms_inventory: JSON.stringify({
                        list_inventory: true,
                        show_store_inventory: true,
                        view_history: true,
                        transfer_goods_to_stores: true,
                        edit_product_in_stock: true,
                    }),
                    view_transit: true,
                    perms_transit: JSON.stringify({
                        add_new_goods_in_transit: true,
                        add_goods_in_transit: true,
                        remove_goods_in_transit: true,
                        edit_goods_in_transit: true,
                        list_debts: true,
                        add_new_debt: true,
                        remove_debt: true,
                        edit_debt: true
                    }),
                    view_orders: true,
                    perms_orders: JSON.stringify({
                        list_orders: true,
                        add_order: true,
                        remove_order: true,
                        edit_order: true,
                        list_address: true,
                        add_address: true,
                        remove_address: true,
                        edit_address: true
                    }),
                    view_finance: true,
                    perms_finance: JSON.stringify({
                        list_balances: true,
                        view_balance_details: true,
                        view_worker_details: true,
                        list_daily_closures: true,
                        perform_daily_closure: true
                    }),
                    view_sales: true,
                    perms_sales: JSON.stringify({
                        create_invoices: true,
                        view_history: true
                    }),
                    view_box: true,
                    perms_box: JSON.stringify({
                    }),
                    businessId: business.dataValues.id
                }, { transaction: t })).query

                // Creando unidad
                const unidad = (await Manager().Unit.create({
                    canRemove: false,
                    name: "Unidad",
                    symbol: "U",
                    businessId: business.dataValues.id
                }, { transaction: t })).query

                // Creando moneda USD
                const coin = (await Manager().Coin.create({
                    canRemove: false,
                    active: true,
                    symbol: "USD",
                    value_change: 1,
                    businessId: business.dataValues.id
                }, { transaction: t })).query

                // Creando cargos
                const charge1 = (await Manager().ChargeEmployee.create({
                    canRemove: false,
                    name: "Promotor",
                    description: "Un promotor es la persona que vende articulos de la tienda y gana una comisión por ello",
                    businessId: business.dataValues.id
                }, { transaction: t })).query

                const charge2 = (await Manager().ChargeEmployee.create({
                    canRemove: false,
                    name: "Vendedor",
                    description: "Un vendedor es la persona que vende articulos en la tienda.",
                    businessId: business.dataValues.id
                }, { transaction: t })).query

                // Creando configuración
                const paymentrule = (await Manager().PaymentRule.create({
                    sponser_unit: 6,
                    seller_unit: 4
                }, { transaction: t })).query
                const config = (await Manager().Configuration.create({
                    administrative_payments: 30,
                    re_investment: 70,
                    apply_rules_ofers: true,
                    apply_payment_results: true,
                    currency_payment_to_workers_id: coin.dataValues.id,
                    paymentruleId: paymentrule.dataValues.id,
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
