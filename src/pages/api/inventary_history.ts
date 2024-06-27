import { Manager, sequelize } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";
import { group } from "console";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    return ApiRequestTemplate(
        req,
        res,
        Manager().InventaryHistory,
        [
            {
                model: Manager().User.model, as: 'user'
            },
            {
                model: Manager().Shop.model, as: 'shop'
            },
            {
                model: Manager().Product.model, as: 'product'
            },
            {
                model: Manager().Business.model, as: 'business'
            },
        ]
    )

}

