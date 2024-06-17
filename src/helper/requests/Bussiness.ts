import { ENDPOINTS, model_request } from "./Endpoints"

export const get_bussines_by_code = async (code:string, onSend: (status: number, data: any) => void) => {
    const response = await model_request("GET", `${ENDPOINTS.bussiness}/${code}/`) as any
    onSend(response.status, response.data)
}

export const get_bussiness = async (pagination: { page: number, pageSize: number, filter?: any }, onSend: (status: number, data: any) => void) => {
    const string_filter = pagination.filter ? `&filter=${JSON.stringify(pagination.filter)}` : ""
    const response = await model_request("GET", `${ENDPOINTS.bussiness}?page=${pagination.page}&pageSize=${pagination.pageSize}${string_filter}`) as any
    onSend(response.status, response.data)
}