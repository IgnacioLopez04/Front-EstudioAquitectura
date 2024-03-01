import { Link, useNavigate } from "react-router-dom"
import '../pages/Homes/AdminPage.css'
import Logo from '../assets/LogoNegro.svg';

function LinksMenu(){

    // let {logoutUser} = useContext(AuthContext);

    return(
        <article className="links-menu">
            <Link to='/estudio'>Estudio</Link>
            <Link to='/estudio/clientes'>Clientes</Link>
            <Link to='/estudio/arquitectos'>Arquitectos</Link>
            {/* <Link to='/login' onClick={logoutUser}>Cerrar Sesión</Link> */}
        </article>
    )
}

export function NavMenu(){

    const navigate = useNavigate();

    return(
        <>
            <nav className="menu-div">
                <img src={Logo} alt="Logo" className="logo" onClick={()=>{navigate('/estudio/')}}></img>
                    {/* <h1 className="title-name">Estudio Arquitectura</h1>
                    <h2 className="title-page">Administrador</h2> */}
                <LinksMenu></LinksMenu>
            </nav>
            
        </>
    )
}