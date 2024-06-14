import { Manager } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    try {
        // Creando BD si no está creada
        Manager()

        // Accediendo a los usuarios
        const users = (await Manager().User.findAll()).toJSON()
        console.log("users", users, users.length)

        res.status(200).json({
            isInit: users.length > 0
        })
    }
    catch {
        res.status(200).json({
            isInit: false
        })
    }
}
