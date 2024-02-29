
import { useEffect, useState} from "react";
import { deleteProject, getProjectsClient} from "../../api/projects.api";
import { Modal } from "../../components/Modal";
import { DeseaEliminar } from "../../components/DeseaEliminar";
import { NewProjectPage } from "./NewProjectPage";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faMagnifyingGlass, faTrash, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

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

    const toggleModal = ()=>{
        setEstadoModal(!estadoModal);
    };

    const navigate = useNavigate()

    return(
        <>
            <div className='title-nw-pj'>
                <h2 className='py-clients'>Proyectos</h2>
                <button onClick={()=>{toggleModal();}}><FontAwesomeIcon icon={faCirclePlus} className="icon"/>Nuevo Proyecto</button>
            </div>
            {projects.map(project => (
                <div key={project.id} className="project">
                    <h2 className="pj-name">{project.nombre}</h2>
                    <p className="pj-description">{project.descripcion}</p>
                    <div className="btns-pj">
                        <button onClick={()=>{openModalEditar(project.token);}}><FontAwesomeIcon icon={faPenToSquare} className="icon"/>Editar</button>
                        <button onClick={()=>{navigate(`/estudio/proyecto/${project.token}`)}}><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>Ver</button>
                        <button className='eliminar-btn' onClick={()=>{openModalEliminar(project.token);}}><FontAwesomeIcon icon={faTrash} className="icon"/>Eliminar</button>
                    </div>
                </div>
            ))}
            <Modal estado={estadoModal} cambiarEstado={toggleModal} title='Nuevo Proyecto'>
                <NewProjectPage cerrarModal={toggleModal} client={params.id} loads={loadProjects}></NewProjectPage>
            </Modal>
            <Modal estado={estadoModalEliminar} cambiarEstado={closeModalEliminar} title='Eliminar proyecto'>
                <DeseaEliminar funcion={deleteProject} id={idProyecto} cancelar={closeModalEliminar} aceptar={closeModalEliminar} loads={loadProjects}></DeseaEliminar>
            </Modal>
            <Modal estado={estadoEditar} cambiarEstado={closeModalEditar} title='Editar proyecto'>
                <NewProjectPage cerrarModal={closeModalEditar} idProject={idProyecto} loads={loadProjects}></NewProjectPage>
            </Modal>
        </>
    );
}