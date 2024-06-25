import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiRequestTemplate } from "./ApiRequestTemplate";
import { generateHash } from "@/helper/generateHash";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == "POST" && req.body.password_hash != undefined){
        req.body.password_hash = await generateHash(req.body.password_hash)
    }
    else if (req.method == "PUT" && req.body.password_hash != undefined){
        console.log("ENTREEE")
        req.body.password_hash = await generateHash(req.body.password_hash)
    }

    return ApiRequestTemplate(
        req,
        res,
        Manager().User,
        [
            {
                model: Manager().Shop.model, as: 'shop', include: [
                    {
                        model: Manager().Business.model, as: 'businesses'
                    },
                ]
            },
        ]
    )

}
