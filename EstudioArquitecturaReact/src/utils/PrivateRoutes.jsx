import { Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Se utiliza para poder ocultar las rutas si no estas logeado.
const PrivateRoutes = ()=>{

    let {user} = useContext(AuthContext);
    // Si existe un usuario autorizado me deja navegar, sino me redije solo al login.
    return(
        user ? <Outlet/> : <Navigate to={'/login'}></Navigate>
    )
}

export default PrivateRoutes;