import { ENDPOINTS, model_request } from "./Endpoints"

export const get_messenger = async (pagination: { page: number, pageSize: number, filter?: any }, onSend: (status: number, data: any) => void) => {
    const string_filter = pagination.filter ? `&filter=${JSON.stringify(pagination.filter)}` : ""
    const response = await model_request("GET", `${ENDPOINTS.messenger}?page=${pagination.page}&pageSize=${pagination.pageSize}${string_filter}`) as any
    onSend(response.status, response.data)
}

export const create_edit_messenger = async (action: string, id: number, data: any, onSend: (status: number, data: any) => void) => {
    if (action == 'create') {
        const response = await model_request("POST", `${ENDPOINTS.messenger}`, data) as any
        onSend(response.status, response.data)
    }
    else if (action == 'edit') {
        const response = await model_request("PUT", `${ENDPOINTS.messenger}?id=${id}`, data) as any
        onSend(response.status, response.data)
    }
}

export const remove_messenger = async (id: number, onSend: (status: number, data: any) => void) => {
    const response = await model_request("DELETE", `${ENDPOINTS.messenger}?id=${id}`) as any
    onSend(response.status, response.data)
}
