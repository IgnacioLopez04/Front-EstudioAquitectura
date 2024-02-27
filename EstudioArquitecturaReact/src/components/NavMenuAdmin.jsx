import { Link, useNavigate } from "react-router-dom"
import '../pages/Homes/AdminPage.css'

function LinksMenu(){
    return(
        <article className="links-menu">
            <Link to='/estudio'>Estudio</Link>
            <Link to='/estudio/clientes'>Clientes</Link>
            <Link to='/estudio/arquitectos'>Arquitectos</Link>
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