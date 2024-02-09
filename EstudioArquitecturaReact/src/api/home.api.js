import axios from "axios";

const homeApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/imagenesGallery`,
})

export const getImagesGallery = ()=> homeApi.get();
