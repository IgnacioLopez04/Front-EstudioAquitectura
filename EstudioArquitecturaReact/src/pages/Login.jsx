import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export function Login(){

    let{loginUser} = useContext(AuthContext);
    
    return(
        <form onSubmit={loginUser}>
            <input type="text" name="username" placeholder="Usuario" ></input>
            <input type="password" name="password" placeholder="Contraseña" ></input>
            <button type="submit">Login</button>
        </form>
    )
}