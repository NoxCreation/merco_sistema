import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "../ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    return ApiRequestTemplate(
        req,
        res,
        Manager().ProfitEmployee,
        [
            {
                model: Manager().Employee.model, as: 'employee'
            },
            {
                model: Manager().ValueCoin.model, as: 'valuecoin'
            },
        ]
    )
}
