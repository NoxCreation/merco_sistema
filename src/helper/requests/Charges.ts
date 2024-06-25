import { ENDPOINTS, model_request } from "./Endpoints"

export const get_charges = async (pagination: { page: number, pageSize: number, filter?: any }, onSend: (status: number, data: any) => void) => {
    const string_filter = pagination.filter ? `&filter=${JSON.stringify(pagination.filter)}` : ""
    const response = await model_request("GET", `${ENDPOINTS.charge}?page=${pagination.page}&pageSize=${pagination.pageSize}${string_filter}`) as any
    onSend(response.status, response.data)
}

export const create_edit_charge = async (action: string, id: number, data: any, onSend: (status: number, data: any) => void) => {
    if (action == 'create') {
        const response = await model_request("POST", `${ENDPOINTS.charge}`, data) as any
        onSend(response.status, response.data)
    }
    else if (action == 'edit') {
        const response = await model_request("PUT", `${ENDPOINTS.charge}?id=${id}`, data) as any
        onSend(response.status, response.data)
    }
}

export const remove_charge = async (id: number, onSend: (status: number, data: any) => void) => {
    const response = await model_request("DELETE", `${ENDPOINTS.charge}?id=${id}`) as any
    onSend(response.status, response.data)
}
