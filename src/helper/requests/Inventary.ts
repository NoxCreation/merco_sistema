import { ENDPOINTS, model_request } from "./Endpoints"

export const get_inventary = async (pagination: { page: number, pageSize: number, filter?: any }, onSend: (status: number, data: any) => void) => {
    const string_filter = pagination.filter ? `&filter=${JSON.stringify(pagination.filter)}` : ""
    const response = await model_request("GET", `${ENDPOINTS.inventary}?page=${pagination.page}&pageSize=${pagination.pageSize}${string_filter}`) as any
    onSend(response.status, response.data)
}

export const create_edit_inventary = async (action: string, id: number, data: any, onSend: (status: number, data: any) => void) => {
    if (action == 'create') {
        const response = await model_request("POST", `${ENDPOINTS.inventary}`, data) as any
        onSend(response.status, response.data)
    }
    else if (action == 'edit') {
        const response = await model_request("PUT", `${ENDPOINTS.inventary}?id=${id}`, data) as any
        onSend(response.status, response.data)
    }
}

export const remove_inventary = async (id: number, onSend: (status: number, data: any) => void) => {
    const response = await model_request("DELETE", `${ENDPOINTS.inventary}?id=${id}`) as any
    onSend(response.status, response.data)
}
