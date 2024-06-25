import { ENDPOINTS, model_request } from "./Endpoints"

export const get_coin = async (pagination: { page: number, pageSize: number, filter?: any }, onSend: (status: number, data: any) => void) => {
    const string_filter = pagination.filter ? `&filter=${JSON.stringify(pagination.filter)}` : ""
    const response = await model_request("GET", `${ENDPOINTS.coin}?page=${pagination.page}&pageSize=${pagination.pageSize}${string_filter}`) as any
    onSend(response.status, response.data)
}

export const create_edit_coin = async (action: string, id: number, data: any, onSend: (status: number, data: any) => void) => {
    if (action == 'create') {
        const response = await model_request("POST", `${ENDPOINTS.coin}`, data) as any
        onSend(response.status, response.data)
    }
    else if (action == 'edit') {
        const response = await model_request("PUT", `${ENDPOINTS.coin}?id=${id}`, data) as any
        onSend(response.status, response.data)
    }
}

export const remove_coin = async (id: number, onSend: (status: number, data: any) => void) => {
    const response = await model_request("DELETE", `${ENDPOINTS.coin}?id=${id}`) as any
    onSend(response.status, response.data)
}
