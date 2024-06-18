import { Manager, sequelize, sleep } from "@/backend/models/engine";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    try {
        // Creando BD si no está creada
        await Manager()
        await sleep(10000)

        // Accediendo a los usuarios
        const users = (await Manager().User.findAll()).toJSON()
        console.log("users", users, users.length)

        res.status(200).json({
            isInit: users.length > 0
        })
    }
    catch(err) {
        //const cl = await sequelize.close()
        //console.log("close", cl)
        console.log("Error!!!!", err)
        console.log("end fin")
        res.status(200).json({
            isInit: false
        })
    }
}
