import { ENDPOINTS, model_request } from "./Endpoints"

export const initialize_system = async (onSend: (status: number, data: any) => void) => {
    const response = await model_request("GET", `${ENDPOINTS.initilize_system}`) as any
    onSend(response.status, response.data)
}