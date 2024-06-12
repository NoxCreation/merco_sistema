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
        Manager().Sale,
        [
            {
                model: Manager().Coin.model, as: 'coin'
            },
            {
                model: Manager().ValueCoin.model, as: 'valuecoin'
            },
            {
                model: Manager().ValueCoin.model, as: 'valuecoin2'
            },
            {
                model: Manager().ValueCoin.model, as: 'valuecoin3'
            },
            {
                model: Manager().Product.model, as: 'products'
            },
            {
                model: Manager().User.model, as: 'user'
            },
            {
                model: Manager().ProfitEmployee.model, as: 'profitemployee'
            },
            {
                model: Manager().ProfitEmployee.model, as: 'profitemployee2'
            },
            {
                model: Manager().CardAccount.model, as: 'cardaccount'
            }
        ]
    )

}
