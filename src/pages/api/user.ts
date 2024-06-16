import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";
import { generateHash } from "@/helper/generateHash";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    req.body.password_hash = generateHash(req.body.password_hash)

    return ApiRequestTemplate(
        req,
        res,
        Manager().User
    )

}
