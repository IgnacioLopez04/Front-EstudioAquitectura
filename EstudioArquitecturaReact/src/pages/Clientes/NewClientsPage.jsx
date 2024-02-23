import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom"
import { createClient, deleteClient, getClient, updateClient } from "../../api/clients.api";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export function NewClientsPage({cambiarEstado}){
    const params = useParams();
    const navigate = useNavigate();
    const {register, setValue, handleSubmit, formState:{errors}} = useForm();

    useEffect(()=>{
        async function loadClients(){
            if(params.id){
                const res = await getClient(params.id);
                setValue('nombre', res.data.nombre);
                setValue('apellido', res.data.apellido);
                setValue('dni', res.data.dni);
            }
        }
        loadClients();
    }, [])

    const onSubmit = handleSubmit(async data=>{
        if(params.id){
            await updateClient(params.id, data);
            toast.success('Cliente actualizado');
            navigate(`/estudio/clientes/${params.id}/`)
        }else{
            await createClient(data);
            toast.success('Cliente creado');
            cambiarEstado();
        }
        
    })
    
    const deleteClientBtn = async ()=>{
        const accepted = window.confirm('Estas seguro que quieres eliminar el cliente?');
        if(accepted){
            await deleteClient(params.id);
            toast.success('Cliente eliminado');
            navigate('/estudio/clientes/');
        }
    } 

    // VER COMO ORDENAR MEJOR EL RETURN
    return(
        <>
            <article className='article-form'>
                {params.id && <h1 className="title-update">Actualizar cliente</h1>}
                <form onSubmit={onSubmit} className="form-client">
                    <label htmlFor="name">Nombre</label>
                    <input id='name' type='text' placeholder="Ej: Roberto" {...register('nombre', {required: true})}></input>
                    {errors.nombre && <span>El campo es requerido</span>}
                    <label htmlFor="lastname">Apellido</label>
                    <input id='lastname' type='text' placeholder='Ej: Castro' {...register('apellido', {required: true})}></input>
                    {errors.apellido && <span>El campo es requerido</span>}
                    <label htmlFor="dni">DNI</label>
                    <input id='dni' type='text' placeholder="55.432.678" {...register('dni', {required: true,  maxLength:8})}></input>
                    {errors.dni && errors.dni.type === "required" && (<span>El campo es requerido.</span>)}
                    {errors.dni && errors.dni.type === "maxLength" && (<span>El campo debe tener exactamente 8 dígitos.</span>)}
                    {params.id &&
                        <div>
                            <button name="btn-save">Actualizar</button>
                            <button name="btn-delete" onClick={deleteClientBtn}>Borrar</button>
                        </div> 
                        || <button name="btn-save"><FontAwesomeIcon className="icon" icon={faFloppyDisk} />Guardar</button>
                    }
                </form>
            </article>
        </>
    )
}