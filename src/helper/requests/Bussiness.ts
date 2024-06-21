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

export const create_edit_bussiness = async (action: string, id: number, data: any, onSend: (status: number, data: any) => void) => {
    if (action == 'create') {
        const response = await model_request("POST", `${ENDPOINTS.bussiness}`, data) as any
        await model_request("POST", `${ENDPOINTS.shop}`, {
            name: "Almacen",
            canRemove: false,
            description: "Almacen",
            businessId: response.data.id
        }) as any
        onSend(response.status, response.data)
    }
    else if (action == 'edit') {
        const response = await model_request("PUT", `${ENDPOINTS.bussiness}?id=${id}`, data) as any
        onSend(response.status, response.data)
    }
}

export const remove_bussiness = async (id: number, onSend: (status: number, data: any) => void) => {
    const response = await model_request("DELETE", `${ENDPOINTS.bussiness}?id=${id}`) as any
    onSend(response.status, response.data)
}
