import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Link} from 'react-scroll';
import { getStudio } from "../api/estudio.api"

function NavLink({href, text}){

    return(
        // className="link-div-hm"
        <Link className="link-div-hm" to={href} spy={true} smooth={true} offset={-170} duration={500}>{text}</Link>
    )
}

function LinksMenu(){
    return(
        <div className="links-menu-hm">
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
                    <div className="title-div-hm" onClick={()=>{navigate('/inicio/')}}>
                        <h1 className="title-name-hm">{studio[0].nombre}</h1>
                    </div>
                    <LinksMenu></LinksMenu>
                    {/* {href && 
                    <>
                        <LinksMenu text={text} href={href}></LinksMenu> 
                    </>
                    || ''} */}
                </nav>
            </>
        )
    }
}