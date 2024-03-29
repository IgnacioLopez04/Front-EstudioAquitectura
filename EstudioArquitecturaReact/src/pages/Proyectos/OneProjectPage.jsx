import { useEffect, useState, useRef } from "react";
import { NavMenuHome } from '../../components/NavMenu';
import { NavMenu } from "../../components/NavMenuAdmin";
import { TitlePages } from "../../components/TitlePages";
import { Modal } from "../../components/Modal";
import { useLocation, useParams } from "react-router-dom";
import { getImagesProject, getProject } from "../../api/projects.api";
import './OneProject.css';
import QRCode from 'react-qr-code';

export function OneProjectPage(){
    const [project, setProject] = useState([]);
    const [images, setImages] = useState([]);
    const [urlInicio, setUrlInicio] = useState(false);
    const [estadoModalQr, setEstadoModalQr] = useState(false);
    const params = useParams();
    const location = useLocation();

    useEffect(()=>{
        async function loadProject(){
            if(location.pathname.includes('inicio')){
                setUrlInicio(true);
            }
            
            const proj = await getProject(params.id);
            setProject(proj.data);

            const img = await getImagesProject(params.id);
            setImages(img.data.imagenes);

        }
        loadProject();
    }, [])

    const toggleModal = ()=>{
        setEstadoModalQr(!estadoModalQr);
    }

    const qrSectionRef = useRef(null);

    const imprimirQR = () => {
        window.print();
    };

    const UrlQr = 'https://estudio-aquitectura.vercel.app/#/inicio/' + params.id;

    const title = 'Proyecto '+ ' - ' + `${project.nombre}`
    return(
        <>
            {urlInicio && <NavMenuHome href="/inicio" text='Inicio'></NavMenuHome> || <NavMenu></NavMenu>}
            <TitlePages title={title} onClickModal={()=>{toggleModal();}} text={'Código QR'}></TitlePages>
            <section className="section-pj">
                <article className="detalle-direc">
                    <div className="detalle">
                        <h2>Detalle:</h2>
                        <p>{project.descripcion}</p>
                    </div>
                    <div className="direccion">
                        <p><span className="span-pj">Calle:</span> {project.direccion}</p>
                        <p><span className="span-pj">Ciudad:</span> {project.ciudad}</p>
                        {!urlInicio && <p><span className="span-pj">Proyecto privado:</span> {project.esPrivado && 'SI' || 'NO'}</p>}
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
            <Modal estado={estadoModalQr} cambiarEstado={()=>{toggleModal();}} title={'Código QR'}>
                <section className="div-qr">
                    <QRCode ref={qrSectionRef} value={UrlQr} fgColor="#000000" bgColor="#ffffff" size={200} style={{height: '250px', width:'250px'}}></QRCode>
                    <button className="imprimir" onClick={imprimirQR}>Imprimir QR</button>
                </section>
            </Modal>
        </>
    )
}