import { ENDPOINTS, model_request } from "./Endpoints"

export const send_sms = async (mstext: string, recipient: string, user_id: string, onSend: (status: number, data: any) => void) => {
    const response = await model_request("POST", `${ENDPOINTS.internal_sms}`, { mstext, recipient, user_id, employee_id: undefined }) as any
    onSend(response.status, response.data)
}