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
        Manager().Payroll,
        [
            {
                model: Manager().Employee.model, as: 'employee'
            },
            {
                model: Manager().Sale.model, as: 'sales'
            }
        ],
        async () => {
            try {
                await sequelize.transaction(async (t) => {
                    const config = (await Manager().Payroll.create({
                        date_from: req.body.date_from,
                        date_to: req.body.date_to,
                        employeeId: req.body.employeeId,
                        type_payment: req.body.type_payment,
                        amount: req.body.amount,
                    }, { transaction: t })).query

                    await config.setSales(req.body.sales, { transaction: t });
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
