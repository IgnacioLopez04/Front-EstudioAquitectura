import { useState } from "react"
import { Route, redirect } from "react-router-dom"

export function PrivateRouter({children, ...rest}){

    const [authenticated, setAuth] = useState(false);

    return(
        <>
            {/* <Route {...rest}>{!authenticated ? redirect('/login') : children}</Route> */}
        </>
    )
}