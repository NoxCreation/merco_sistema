import { ENDPOINTS, model_request } from "./Endpoints"

export const check_system = async (onSend: (status: number, data: any) => void) => {
    const response = await model_request("GET", `${ENDPOINTS.check_system}`) as any
    onSend(response.status, response.data)
}