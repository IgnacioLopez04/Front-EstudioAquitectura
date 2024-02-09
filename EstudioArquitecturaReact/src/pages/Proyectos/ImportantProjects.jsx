import { useEffect, useState } from "react"
import { getImportantProject } from "../../api/projects.api"
import { useNavigate } from "react-router-dom";

export function ImportantProjects(){

    const [projects, setProjects] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const navegate = useNavigate();
    useEffect(()=>{
        async function loadImportanProjects(){
            const res = await getImportantProject();
            setProjects(res.data.proyectos);
            setImagenes(res.data.imagenes);
        }
        loadImportanProjects();
    }, [])
    
    return(
        <>
            <section className="proy_importantes" id='proj-importants'>
                {projects.map((project=>
                <a key={project.id} onClick={()=> navegate(`/inicio/${project.token}`)}>
                    <div>

                        <h2>{project.nombre}</h2>
                        {imagenes[project.id] && (
                            <img src={`${imagenes[project.id].imagen}`} alt={`Imagen del proyecto ${project.nombre}`} className="pj"></img>
                        )}
                        <p>{project.descripcion}</p>
                    </div>
                </a>
                ))}
            </section>
        </>
    )
}