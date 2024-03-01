import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-scroll';
import { getStudio } from "../api/estudio.api";
import Logo from '../assets/LogoNegro.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "./Footer";

function NavLink({href, text, href2=null}){

    return(
        <>
            {href2==null && 
                <Link className="link-div-hm" to={href} spy={true} smooth={true} offset={-170} duration={500}>{text}</Link>
                ||
                <a className="link-div-hm" href={href2}>{text}</a>
            }
        </>
    )
}

function LinksMenu(){
    return(
        <div className="links-menu-hm">
            <NavLink href2={'/'} text={'Inicio'}></NavLink>
            <NavLink href={'destacados'} text={'Destacados'}></NavLink>
            <NavLink href={'proyectos'} text={'Proyectos'}></NavLink>
            <NavLink href={'contactos'} text={'Contacto'}></NavLink>
        </div>
    )
}

export function NavMenuHome(){

    const [studio, setStudio] = useState(undefined);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadTitle(){
            const res = await getStudio();
            setStudio(res.data);;
        }
        loadTitle();
    }, []);

    if (studio === undefined){
        return(
            <div className="loading-div"></div>
        )
    }else{
        return(
            <>
                <nav className="menu-div-hm">
                    <div className="div-menu-res">
                        <FontAwesomeIcon icon={faBars} className="btn-menu-res"></FontAwesomeIcon>
                        <img src={Logo} alt="Logo" className="logo" onClick={()=>{navigate('/')}}></img>
                        {/* <h1 className="title-name-hm">{studio[0].nombre}</h1> */}
                    </div>
                    <LinksMenu></LinksMenu>
                </nav>
            </>
        )
    }
}