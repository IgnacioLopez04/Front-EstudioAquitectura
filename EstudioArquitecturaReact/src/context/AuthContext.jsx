import { createContext, useState, useEffect } from "react";
import { getLogin, refreshToken } from "../api/login.api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({children}){

    // Seteo los valores de los tokens si es que hay en local, sino se setean como null
    let [authTokens, setAuthToken] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Realizo el inicio de sesion, si corresponde el usuario y contraseña, recibo los tokens necesarios.
    const loginUser = async (e)=>{
        e.preventDefault();
        try{
            let response = await getLogin({'username':e.target.username.value, 'password':e.target.password.value});
            // Seteo los nuevos tokens
            setAuthToken(response.data);
            setUser(jwtDecode(response.data.access));
            // Almaceno en local los tokens
            localStorage.setItem('authTokens',JSON.stringify(response.data));
            navigate('/estudio');
        }catch(e){
            // Si recibo un error que no tengo autorizacion, salgo de la sesion para intentar ingresar de nuevo.
            if(e.response.status == 401){
                logoutUser();
            }else{
                console.log(e.response.status);
            }
        }
    }

    const logoutUser = ()=>{
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    const updateToken = async ()=>{
        try{
            let response = await refreshToken({'refresh':authTokens?.refresh});
            setAuthToken(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));

        }catch(e){
            logoutUser();
        }

        if(loading){
            setLoading(false);
        }
    }

    // Los datos necesarios para los diferentes contextos.
    let contextData = {
        user:user,
        authTokens : authTokens,
        loginUser : loginUser,
        logoutUser : logoutUser,
    }

    useEffect(()=>{
        
        if(!loading){
            updateToken();
            setLoading(true);
        }
        // Se va actualizando cada 15 min si es que me mantengo en el navegador.
        const Minutos = 1000 * 60 * 15
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken();
            }
        },Minutos);
        return ()=> clearInterval(interval);
    }, [authTokens, loading])

    // Si no se carga todo aquello que sea necesario para tener una sesion, no renderiza el resto de hijos.
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}