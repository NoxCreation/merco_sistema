import type { NextApiRequest, NextApiResponse } from "next";
import { ENDPOINTS } from "@/helper/requests/Endpoints";
import axios from "axios";
import { Manager } from "@/backend/models/engine";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method == 'POST') {
        const { mstext, recipient, user_id, employee_id } = req.body
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
        console.log(user_id)

        const response = await axios.request(config)

        console.log("response.data.id", response.data.id, "user_id", user_id)
        if (response.status == 200)
            (await Manager().SMSHistory).create({
                sms_id: response.data.id,
                action: 'Cambio de contraseña',
                sms: "-",
                userId: user_id,
                employeeId: employee_id
            })

        return res.status(200).json(response.data)
        //return res.status(200).json()
    }
}
