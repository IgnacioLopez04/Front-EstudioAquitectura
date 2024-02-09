import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getStudio } from "../api/estudio.api"

function NavLink({href, text}){

    return(
        <div className="link-div-hm">
            <Link to={href}>{text}</Link>
        </div>
    )
}

function LinksMenu({text, href}){
    return(
        <article className="links-menu-hm">
            <NavLink href={href} text={text}></NavLink>
        </article>
    )
}

export function NavMenuHome({text, href}){

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
                    {href && <LinksMenu text={text} href={href}></LinksMenu> || ''}
                </nav>
            </>
        )
    }
}