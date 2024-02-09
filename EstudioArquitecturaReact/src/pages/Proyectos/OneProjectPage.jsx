import { useEffect, useState } from "react";
import { NavMenuHome } from '../../components/NavMenu';
import { NavMenu } from "../../components/NavMenuAdmin";
import { TitlePages } from "../../components/TitlePages";
import { useLocation, useParams } from "react-router-dom";
import { getImagesProject, getProject } from "../../api/projects.api";
import './OneProject.css';

export function OneProjectPage(){
    const [project, setProject] = useState([]);
    const [images, setImages] = useState([]);
    const [urlInicio, setUrlInicio] = useState(false);
    const params = useParams();
    const location = useLocation();

    useEffect(()=>{
        async function loadProject(){
            const proj = await getProject(params.id);
            setProject(proj.data);

            const img = await getImagesProject(params.id);
            setImages(img.data.imagenes);

            if(location.pathname.includes('inicio')){
                setUrlInicio(true);
            }
        }
        loadProject();
    }, [])

    const title = 'Proyecto '+ ' - ' + `${project.nombre}`
    return(
        <>
            {urlInicio && <NavMenuHome href="/inicio" text='Inicio'></NavMenuHome> || <NavMenu></NavMenu>}
            <TitlePages title={title}></TitlePages>
            <section className="section-pj">
                <article>
                    <div className="detalle">
                        <h2>Detalle:</h2>
                        <p>{project.descripcion}</p>
                    </div>
                    <div className="direccion">
                        <p><span>Calle:</span> {project.direccion}</p>
                        <p><span>Ciudad:</span> {project.ciudad}</p>
                        {!urlInicio && <p><span>Proyecto privado:</span> {project.esPrivado && 'SI' || 'NO'}</p>}
                    </div>
                </article>
                <article className="images">
                    <h2>Imagenes</h2>
                    <div className="cont-1">
                        <div className="cont-2">
                            {images.map(image=>(
                                <div key={image.id} className="image-div">
                                    <img src={`${image}`} className="image"></img>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            </section>
        </>
    )
}