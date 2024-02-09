
import { useEffect, useState} from "react";
import { deleteProject, getProjectsClient} from "../../api/projects.api";
import { Modal } from "../../components/Modal";
import { DeseaEliminar } from "../../components/DeseaEliminar";
import { NewProjectPage } from "./NewProjectPage";
import { useNavigate, useParams } from "react-router-dom";



export function ProjectsPage(){
    // Se inicializa vacio y luego se carga
    const params = useParams();
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalEliminar, setEliminar] = useState(false);
    const [idProyecto, setId] = useState(null);
    const [estadoEditar, setEditar] = useState();
    const [projects, setProjects] = useState([]);
    
    async function loadProjects() {
        const res = await getProjectsClient(params.id);
        // Cargo los proyectos
        setProjects(res.data);  
    }
    
    // Carga los elementos cuando carga la pagina
    useEffect(() => {
        loadProjects();
    }, []);

    const openModalEliminar = (id)=>{
        setId(id);
        setEliminar(!estadoModalEliminar);
    }

    const closeModalEliminar = ()=>{
        setEliminar(!estadoModalEliminar);
    }

    const openModalEditar = (id)=>{
        setId(id);
        setEditar(!estadoEditar);
    }

    const closeModalEditar = ()=>{
        setEditar(!estadoEditar);
    }

    const openModal = ()=>{
        setEstadoModal(!estadoModal);
    };

    const closeModal = ()=>{
        setEstadoModal(!estadoModal);
    }

    const navigate = useNavigate()

    return(
        <>
            <div className='title-nw-pj'>
                <h2 className='py-clients'>Proyectos</h2>
                <button onClick={()=>{openModal();}}>Nuevo Proyecto</button>
            </div>
            {projects.map(project => (
                <div key={project.id} className="project">
                    <h2 className="pj-name">{project.nombre}</h2>
                    <p className="pj-description">{project.descripcion}</p>
                    <div>
                        <button onClick={()=>{openModalEliminar(project.token);}}>Eliminar</button>
                        <button onClick={()=>{openModalEditar(project.token);}}>Editar</button>
                        <button onClick={()=>{navigate(`/estudio/proyecto/${project.token}`)}}>Ver</button>

                    </div>
                </div>
            ))}
            <Modal estado={estadoModal} cambiarEstado={closeModal} title='Nuevo Proyecto'>
                <NewProjectPage cerrarModal={closeModal} client={params.id} loadProjects={loadProjects}></NewProjectPage>
            </Modal>
            <Modal estado={estadoModalEliminar} cambiarEstado={closeModalEliminar} title='Eliminar proyecto'>
                <DeseaEliminar funcion={deleteProject} id={idProyecto} cancelar={closeModalEliminar} aceptar={closeModalEliminar} loads={loadProjects}></DeseaEliminar>
            </Modal>
            <Modal estado={estadoEditar} cambiarEstado={closeModalEditar} title='Editar proyecto'>
                <NewProjectPage cerrarModal={closeModalEditar} idProject={idProyecto} loadProjects={loadProjects}></NewProjectPage>
            </Modal>
        </>
    );
}