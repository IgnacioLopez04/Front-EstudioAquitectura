import { useEffect, useState } from "react"
import { getAllArquitectos } from "../api/arquitectos.api";
import { getStudio } from '../api/estudio.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/fontawesome-free-brands'

export function Footer(){

    const [architect, setArchitect] = useState([])
    const [studio, setStudio] = useState(undefined)

    useEffect(()=>{
        async function loadFooter(){
            let res = await getAllArquitectos();
            setArchitect(res.data);
            res = await getStudio();
            setStudio(res.data);
        }
        loadFooter();
    }, [])

    if(studio === undefined){
        return(
            <div className="loading-div"></div>
        )
    }

    const mailto = `mailto:${studio[0].correo}`;

    return(
        <footer id="contactos">
            <ul id="datos">
                <div className="dato">
                    <h3><FontAwesomeIcon icon={faWhatsapp} className="icon"></FontAwesomeIcon> Telefonos</h3>
                    {architect.map(arc=>(
                        <li> {arc.nombre} {arc.apellido} - <a href="tel:"> {arc.telefono}</a></li>
                    ))}
                </div>
                <div className="divisor"></div>
                <div className="dato">
                    <h3><FontAwesomeIcon icon={faEnvelope} className="icon"></FontAwesomeIcon>Mail</h3>
                    <li><a href={mailto}>{studio[0].correo}</a></li>
                </div>
                <div className="divisor"></div>
                <div className="dato">
                    <h3><FontAwesomeIcon className="icon" icon={faMapLocationDot}/>Visitanos en nuestro estudio</h3>
                    <li><a 
                    href={`https://www.google.com/maps/search/${studio && studio.length > 0 ? encodeURIComponent(studio[0].direccion) : ''}`}
                    target="_blank"
                    > {studio[0].direccion}</a></li>
                </div>
            </ul>
            <ul id="redes">
                <li><a href="" id="fb">Facebook</a></li>
                <li><a href="https://www.instagram.com/gabutti_piovano/?igsh=OHN6Zm1icGx1NDNy" id="ig" target="_blank">Instagram</a></li>
            </ul>
        </footer>
    )
}