import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { getAllArquitectos } from "../api/arquitectos.api";
import { getStudio } from "../api/estudio.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/fontawesome-free-brands";
import { faEnvelope, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/LogoNegro.svg';

export function MenuSlide(){

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

    const cerrarMenu = ()=>{
        const menu = document.getElementsByClassName('menu-slide')[0];
        menu.style.transform = 'translateX(-100%)';
    }

    return(
        <section className="menu-slide" onClick={cerrarMenu}>
            <div>
                <img src={logo} alt="logo" className="logo-sl"></img>
                <ul className="links-slide">
                    <li><Link onClick={cerrarMenu} to={'destacados'} spy={true} smooth={true} offset={-170} duration={500}>Inicio</Link></li>
                    <li><Link onClick={cerrarMenu} to={'destacados'} spy={true} smooth={true} offset={-170} duration={500}>Destacados</Link></li>
                    <li><Link onClick={cerrarMenu} to={'proyectos'} spy={true} smooth={true} offset={-170} duration={500}>Proyectos</Link></li>
                </ul>
            </div>
            <ul className="contactos-slide">
                <div className="dato-sl">
                    <h3><FontAwesomeIcon icon={faWhatsapp} className="icon"></FontAwesomeIcon> Telefonos</h3>
                    {architect.map(arc=>(
                        <li> {arc.nombre} {arc.apellido} - <a href="tel:"> {arc.telefono}</a></li>
                    ))}
                </div>
                <div className="divisor-sl"></div>
                <div className="dato-sl">
                    <h3><FontAwesomeIcon icon={faEnvelope} className="icon"></FontAwesomeIcon>Mail</h3>
                    <li><a href={mailto}>{studio[0].correo}</a></li>
                </div>
                <div className="divisor-sl"></div>
                <div className="dato-sl">
                    <h3><FontAwesomeIcon className="icon" icon={faMapLocationDot}/>Visitanos en nuestro estudio</h3>
                    <li><a 
                    href={`https://www.google.com/maps/search/${studio && studio.length > 0 ? encodeURIComponent(studio[0].direccion) : ''}`}
                    target="_blank"
                    > {studio[0].direccion}</a></li>
                </div>
            </ul>
        </section>
    )
}