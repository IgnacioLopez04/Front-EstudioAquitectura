import axios from 'axios'

const studioApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/estudio/`,
    
});

export const getStudio = () => studioApi.get('/');
export const createStudio = (data) => studioApi.post('', data);
export const updateStudio = (data)=> studioApi.put('', data);