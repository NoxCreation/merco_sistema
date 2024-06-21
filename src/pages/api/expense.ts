import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate, cleanNumberFilter } from "./ApiRequestTemplate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {

    let fvaluecoin = {} as any
    if (req.method == "GET") {
        const { filter } = req.query;
        let _filter = JSON.parse(filter as string)['relations']
        fvaluecoin = _filter ? _filter.valuecoin : {}
        for (let key in fvaluecoin) {
            fvaluecoin = cleanNumberFilter(fvaluecoin, key)
        }
    }

    return ApiRequestTemplate(
        req,
        res,
        Manager().Expense,
        [
            {
                model: Manager().ValueCoin.model, as: 'valuecoin', where: { ...fvaluecoin }, include: [
                    {
                        model: Manager().Coin.model, as: 'coin'
                    }
                ]
            }
        ]
    )

}
