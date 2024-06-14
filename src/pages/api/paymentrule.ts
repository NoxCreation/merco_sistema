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
        Manager().PaymentRule,
        [
            {
                model: Manager().OfferRule.model, as: 'data_by_quantity_sponser'
            },
            {
                model: Manager().OfferRule.model, as: 'data_by_quantity_seller'
            },
            {
                model: Manager().OfferRule.model, as: 'data_by_quantity_sponser_fixed_payment'
            },
            {
                model: Manager().OfferRule.model, as: 'data_by_quantity_seller_fixed_payment'
            }
        ],
        async ()=>{
            try {
                await sequelize.transaction(async (t) => {
                    const paymentrule = (await Manager().PaymentRule.create({
                        sponser_unit: req.body.sponser_unit,
                        seller_unit: req.body.seller_unit,
                    }, { transaction: t })).query
                    
                    await paymentrule.setData_by_quantity_sponser(req.body.by_quantity_sponser, { transaction: t });
                    await paymentrule.setData_by_quantity_seller(req.body.by_quantity_seller, { transaction: t });
                    await paymentrule.setData_by_quantity_seller(req.body.by_quantity_sponser_fixed_payment, { transaction: t });
                    await paymentrule.setData_by_quantity_seller(req.body.by_quantity_seller_fixed_payment, { transaction: t });
                    res.status(200).json(paymentrule)
                })
            }
            catch (e){
                console.log(e)
                res.status(500).json({})
            }
        }
    )

}
