import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    return ApiRequestTemplate(
        req,
        res,
        Manager().HistoryCardAccount,
        [
            {
                model: Manager().ValueCoin.model, as: 'valuecoin', include: [
                    {
                        model: Manager().Coin.model, as: 'coin'
                    }
                ]
            }
        ]
    )
}
