import { ENDPOINTS, model_request } from "./Endpoints"

export const create_user = async (data:any, onSend: (status: number, data: any) => void) => {
    const response = await model_request("POST", `${ENDPOINTS.user}`, data) as any
    onSend(response.status, response.data)
}