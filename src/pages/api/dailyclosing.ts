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
        Manager().DailyClosing,
        [
            {
                model: Manager().Employee.model, as: 'data_employee_seller'
            },
            {
                model: Manager().Employee.model, as: 'data_employee_economic'
            },
            {
                model: Manager().ValueCoin.model, as: 'valuecoins'
            },
            {
                model: Manager().DailyDebt.model, as: 'dailydebts'
            },
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const config = (await Manager().DailyClosing.create({
                        employee_seller_id: req.body.employee_seller_id,
                        employee_economic_id: req.body.employee_economic_id,
                    }, { transaction: t })).query
                    
                    await config.setValuecoins(req.body.amounts, { transaction: t });
                    await config.setDailydebts(req.body.debt, { transaction: t });
                    res.status(200).json(config)
                })
            }
            catch (e){
                console.log(e)
                res.status(500).json({})
            }
        }
    )

}
