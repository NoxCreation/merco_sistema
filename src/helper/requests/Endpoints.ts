import client from "../Client";

export const ENDPOINTS = {
    sms: 'https://zdsms.cu/api/v1/message/send', //https://zdsms.cu/api/v1/test/sendSMS // https://zdsms.cu/api/v1/message/send
    internal_sms: '/sms',
    check_system: "/check-system",
    initilize_system: "/initialize-system",
    bussiness: "/bussiness",
    user: "/user",
    product: "/product",
    category: "/category",
    unit: "/unit",
    coin: "/coin",
    download_excel: "/download_excel",
    shop: '/shop',
    expense: '/expense',
    messenger: '/messenger',
    employees: '/employee',
    charge: '/chargeemployee',
    rol: '/role',
    cardaccount: '/cardaccount',
    historycardaccount: '/historycardaccount',
    inventary: '/inventary',
    inventary_history: '/inventary_history',
    inventary_relocation: '/inventary_relocation',
    configuration: '/configuration',
    offerrule: '/offerrule',
    paymentrule: '/paymentrule',
    fullscreen: '/fullscreen'
}

type RequestMethod = 'POST' | 'PUT' | 'GET' | 'DELETE';

export const download_excel = async (columns: any, rows: any) => {
    const response = await client.post(ENDPOINTS.download_excel, { 
        columns,
        rows
    }, {
        responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Tabla Descarga.xlsx');
    document.body.appendChild(link);
    link.click();
}

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
