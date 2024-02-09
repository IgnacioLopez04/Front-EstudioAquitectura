import { useEffect, useState } from "react"
import { getAllArquitectos } from "../api/arquitectos.api";
import { getStudio } from '../api/estudio.api';

export function Footer(){

    const [architect, setArchitect] = useState([])
    const [studio, setStudio] = useState(undefined)

    useEffect(()=>{
        async function loadFooter(){
            let res = await getAllArquitectos();
            setArchitect(res.data);
            res = await getStudio();
            setStudio(res.data);
        }
        loadFooter();
    }, [])

    if(studio === undefined){
        return(
            <div className="loading-div"></div>
        )
    }
    return(
        <footer id="contactos">
            <ul id="datos">
                <li>
                <a 
                href={`https://www.google.com/maps/search/${studio && studio.length > 0 ? encodeURIComponent(studio[0].direccion) : ''}`}
                target="_blank"
                > {studio[0].direccion}</a></li>
                {architect.map(arc=>(
                    <li> {arc.nombre} {arc.apellido} - <a href="tel:"> {arc.telefono}</a></li>
                ))}
            </ul>
            <ul id="redes">
                <li><a href="" id="fb">Facebook</a></li>
                <li><a href="" id="ig">Instagram</a></li>
            </ul>
        </footer>
    )
}