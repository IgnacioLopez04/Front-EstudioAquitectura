import axios from 'axios'

const loginApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/token`,
    headers:{
        'Content-Type': 'application/json',
    },
})

export const getLogin = (data)=> loginApi.post('/',data);
export const refreshToken = (data)=> loginApi.post('/refresh/', data);

