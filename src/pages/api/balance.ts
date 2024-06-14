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
        Manager().Balance,
        [
            {
                model: Manager().Payroll.model, as: 'payrolls', include:[
                    {
                        model: Manager().Employee.model, as: 'employee'
                    }
                ]
            },
            {
                model: Manager().ValueCoin.model, as: 'investments', include:[
                    {
                        model: Manager().Coin.model, as: 'coin'
                    }
                ]
            },
            {
                model: Manager().ValueCoin.model, as: 'total_profit', include:[
                    {
                        model: Manager().Coin.model, as: 'coin'
                    }
                ]
            },
            {
                model: Manager().ValueCoin.model, as: 'total_expenses', include:[
                    {
                        model: Manager().Coin.model, as: 'coin'
                    }
                ]
            }
        ],
        async ()=>{
            try {
                await sequelize.transaction(async (t) => {
                    const config = (await Manager().Balance.create({
                        date_from: req.body.date_from,
                        date_to: req.body.date_to,
                        total_salaries: req.body.total_salaries,
                    }, { transaction: t })).query
                    
                    await config.setPayrolls(req.body.payroll, { transaction: t });
                    await config.setInvestments(req.body.investments, { transaction: t });
                    await config.setTotal_profit(req.body.total_profit, { transaction: t });
                    await config.setTotal_expenses(req.body.total_expenses, { transaction: t });
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
