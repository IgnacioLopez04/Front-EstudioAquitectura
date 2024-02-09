import axios from 'axios'


const clientApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/clientes/`,
});

export const getAllClients = ()=> clientApi.get('/');

export const getClient = (tk)=> clientApi.get(`/${tk}`);

export const createClient = (client)=> clientApi.post('/', client);

export const deleteClient = (tk)=> clientApi.delete(`/${tk}`);

export const updateClient = (tk, client)=> clientApi.put(`/${tk}/`, client);

