import axios from 'axios'

const projectApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/proyectos/`,
    headers: {
        'Content-Type':'multipart/form-data',
    },
    // withCredentials: true,
});

const destacadosApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/destacados/`,
});

const imagesApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}sitio/api/proyectos/images/`,
    // withCredentials: true,
});

const imageApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_ORIGIN}`,
});


// 'http://127.0.0.1:8000/sitio/api/proyectos/'
export const getAllProjects = ()=> projectApi.get('/');

export const getProjectsClient = (tk)=> projectApi.get(`/cliente/${tk}`);

export const createProject = (project) => projectApi.post('/', project);

export const deleteProject = (tk) => projectApi.delete(`/${tk}`)

export const updateProject = (tk, project) => projectApi.put(`/${tk}/`, project);

export const getProject = (tk)=> projectApi.get(`/${tk}`);

// http://127.0.0.1:8000/sitio/api/destacados/
export const getImportantProject = ()=> destacadosApi.get('/');


// 'http://127.0.0.1:8000/sitio/api/proyectos/images/',
export const getImagesProject = (tk)=> imagesApi.get(`/${tk}`); 

export const deleteImage = (image, tk)=> imagesApi.delete(`${image}/${tk}`);

// 'http://127.0.0.1:8000',
export const getImage = (path)=> imageApi.get(`${path}`);

export const getAllPublicProjects = ()=> imageApi.get('/sitio/api/proyectos/publicos');




