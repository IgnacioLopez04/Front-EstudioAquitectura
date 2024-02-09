import { useEffect, useState } from "react"
import { getAllPublicProjects} from "../../api/projects.api";
import { Carrusel } from "../../components/Carrusel";
import { useNavigate } from "react-router-dom";

export function Proyectos(){

    const [projects, setProjects] = useState([]);
    const navegate = useNavigate();

    useEffect(()=>{
        async function loadProjects(){
            const res = await getAllPublicProjects();
            setProjects(res.data.proyectos);
        }
        loadProjects();
    },[])

    return(
        <>
            <section id="proyectos">
                {projects.map((project, pjIndex)=>
                    <div className="cont_proyectos" key={project.id}>
                        <div className="proyecto">
                            <Carrusel pjIndex={pjIndex} imagenes={project.imagenes}></Carrusel>
                        </div>
                        <a className="descripcion" onClick={()=> navegate(`/inicio/${project.token}`)}>
                            <div>
                                <div className="texto">
                                    <p>
                                        {project.descripcion}
                                    </p>
                                </div>
                            </div>
                            <ul>
                                <li>{project.metrosTotales} metros totales </li>
                                <li>{project.metrosCubiertos} metros cubiertos</li>
                                <li>{project.habitaciones} habitaciones</li>
                                <li>{project.baños} baños</li>
                            </ul>
                        </a>
                    </div>
                )}
            </section>
        </>
    )
}