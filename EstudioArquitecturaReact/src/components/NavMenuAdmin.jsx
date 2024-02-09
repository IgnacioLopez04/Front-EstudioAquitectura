import { Link, useNavigate } from "react-router-dom"
import '../pages/Homes/AdminPage.css'

function NavLink({href, text}){

    return(
        <div className="link-div">
            <Link to={href}>{text}</Link>
        </div>
    )
}

function LinksMenu(){
    return(
        <article className="links-menu">
            <NavLink href='/estudio' text='Estudio'></NavLink>
            <NavLink href='/estudio/clientes' text='Clientes'></NavLink>
            <NavLink href='/estudio/arquitectos' text='Arquitectos'></NavLink>
            <NavLink href='/inicio' text='Inicio'></NavLink>
        </article>
    )
}

export function NavMenu(){

    const navigate = useNavigate();

    return(
        <>
            <nav className="menu-div">
                <div className="title-div" onClick={()=>{navigate('/estudio/')}}>
                    <h1 className="title-name">Estudio Arquitectura</h1>
                    <h2 className="title-page">Administrador</h2>
                </div>
                <LinksMenu></LinksMenu>
            </nav>
            
        </>
    )
}