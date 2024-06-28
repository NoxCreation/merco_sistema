import type { NextApiRequest, NextApiResponse } from "next";
import { ENDPOINTS } from "@/helper/requests/Endpoints";
import axios from "axios";
import { Manager, sequelize } from "@/backend/models/engine";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == 'POST') {
        const { mstext, recipient, user_id, employee_id, bussiness_id } = req.body
        let data = new FormData() as any;
        data.append('mstext', mstext);
        data.append('recipient', recipient);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: ENDPOINTS.sms,
            headers: {
                'Authorization': `Bearer ${process.env.ZDSMS_SECRET}`
            },
            data: data
        } as any
        const response = await axios.request(config)
        if (response.status == 200) {
            await sequelize.transaction(async (t) => {
                const config = (await (await Manager().Business).findOneById(bussiness_id)).query
                const history = (await (await Manager().SMSHistory).create({
                    sms_id: response.data.id,
                    action: 'Cambio de contraseña',
                    sms: "-",
                    userId: user_id,
                    employeeId: employee_id
                })).query
                await history.setConfigurations(config.dataValues.id, { transaction: t });
            })
        }

        return res.status(200).json(response.data)
    }
}
