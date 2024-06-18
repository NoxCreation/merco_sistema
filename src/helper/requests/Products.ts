import client from "../Client"
import { ENDPOINTS, model_request } from "./Endpoints"

export const get_products = async (pagination: { page: number, pageSize: number, filter?: any }, onSend: (status: number, data: any) => void) => {
    const string_filter = pagination.filter ? `&filter=${JSON.stringify(pagination.filter)}` : ""
    const response = await model_request("GET", `${ENDPOINTS.product}?page=${pagination.page}&pageSize=${pagination.pageSize}${string_filter}`) as any
    onSend(response.status, response.data)
}

export const create_edit_product = async (action: string, id: number | undefined, file: any, data: any, onSend: (status: number, data: any) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    // Añade los datos al objeto FormData
    for (const key in data) {
        formData.append(key, data[key]);
    }

    try {
        let response = undefined as any
        if (action == 'create')
            response = await client.post(`${ENDPOINTS.product}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        else if (action == 'edit')
            response = await client.put(`${ENDPOINTS.product}?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        onSend(response.status, response.data)
    } catch (error) {
        console.error('Error al subir el archivo:', error);
    }
}

export const remove_product = async (id: number, onSend: (status: number, data: any) => void) => {
    const response = await model_request("DELETE", `${ENDPOINTS.product}?id=${id}`) as any
    onSend(response.status, response.data)
}