
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export function DeseaEliminar({funcion, id, cancelar, aceptar, loads}){

    const deleteBtn = async ()=>{
        await funcion(id);
        toast.success('Eliminación exitosa');
        aceptar();
        loads();
    }

    return(
        <>
            <h1 className="delete-title">¿Está seguro que quiere eliminar el proyecto?</h1>
            <div className="div-delete">
                <button onClick={()=>{deleteBtn()}}><FontAwesomeIcon icon={faCheck} className='icon'/>Aceptar</button>
                <button className="eliminar-btn" onClick={()=>{cancelar()}}><FontAwesomeIcon icon={faXmark} className="icon"></FontAwesomeIcon>Cancelar</button>
            </div>
        </>
    )
}