import client from "../Client";

export const ENDPOINTS = {
    check_system: "/check-system"
}

type RequestMethod = 'POST' | 'PUT' | 'GET' | 'DELETE';

export const model_request = async (method: RequestMethod, url: string, data?: any, token?: string, showBlob?: boolean) => {
    if (!url) throw new Error('La URL no puede ser nula.');

    let headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    let requestOptions = {
        headers: headers,
        ...(showBlob && { responseType: 'blob' })
    } as any

    try {
        if (method == "POST") {
            const raw = JSON.stringify(data);
            return await client.post(url, raw, requestOptions)
        }
        else if (method == "PUT") {
            const raw = JSON.stringify(data);
            return await client.put(url, raw, requestOptions)
        }
        else if (method == "GET") {
            return await client.get(url, requestOptions)
        }
        else if (method == "DELETE") {
            const raw = data ? JSON.stringify(data) : undefined;
            requestOptions['data'] = raw
            return await client.delete(url, requestOptions)
        }
    }
    catch {
        console.log("Error")
    }
}
