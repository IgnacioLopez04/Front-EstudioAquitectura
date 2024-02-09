import axios from 'axios'

const arqApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/arquitectos/`,
});

export const getAllArquitectos = ()=> arqApi.get('/');

export const getArquitecto = (id)=> arqApi.get(`/${id}/`);

export const deleteArquitecto = (id)=> arqApi.delete(`/${id}/`);

export const createArquitecto = (data)=> arqApi.post('/', data);

export const updateArquitecto = (id, data)=> arqApi.put(`/${id}/`, data);



