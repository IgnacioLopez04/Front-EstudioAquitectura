
import toast from "react-hot-toast";

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
                <button onClick={()=>{deleteBtn()}}>Aceptar</button>
                <button onClick={()=>{cancelar()}}>Cancelar</button>
            </div>
        </>
    )
}