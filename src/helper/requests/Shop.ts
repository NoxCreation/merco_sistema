import { ENDPOINTS, model_request } from "./Endpoints"

export const get_bussines_by_code = async (code:string, onSend: (status: number, data: any) => void) => {
    const response = await model_request("GET", `${ENDPOINTS.bussiness}/${code}/`) as any
    onSend(response.status, response.data)
}