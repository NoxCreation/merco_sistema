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
        Manager().Product,
        [
            {
                model: Manager().Category.model, as: 'category'
            },
            {
                model: Manager().Unit.model, as: 'unit'
            },
            {
                model: Manager().Shop.model, as: 'shop'
            },
        ]
    )
}
