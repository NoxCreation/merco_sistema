import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

client.interceptors.response.use((response: any) => {
    if (response.status == 401) {
        console.log("redirect to refresh token")
        document.location = "/refresh"
    }
    return response;
}, (error: any) => {
    /* if(error.response.status != 400){
        document.location = "/refresh"
    } */
    return error.response;
});

export default client;