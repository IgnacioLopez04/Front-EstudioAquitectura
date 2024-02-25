import { useEffect } from "react";
import { createArquitecto, getArquitecto, updateArquitecto } from "../../api/arquitectos.api"
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";

export function NewArquitectoPage({cerrarModal, idArq, funcion}){

    const {register, handleSubmit, formState: {errors}, setValue } = useForm(); 
    const params = useParams();

    useEffect(()=>{
        async function loadArq(){
            if(idArq != undefined){
                const res = await getArquitecto(idArq);
                setValue('nombre',res.data.nombre);
                setValue('apellido',res.data.apellido);
                setValue('descripcion',res.data.descripcion);
                setValue('telefono', res.data.telefono);
            }
        }
        loadArq();
    }, [])

    const onSubmit = handleSubmit(async data =>{

        if(idArq != undefined){
            try{
                const res = await updateArquitecto(idArq, data)
                toast.success('Arquitecto actualizado');

            } catch(e){
                if(e.response.status == 400){
                    toast.error('El telefono no puede tener más de 10 digitos. Intentelo de nuevo.');
                }
            }
        }else{
            await createArquitecto(data);
            toast.success('Arquitecto creado');
        }
        funcion();
        cerrarModal();
    })

    return(
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Nombre</label>
                <input id='name' placeholder="Ingresa un nombre" type='text' {...register('nombre', {required: true})}></input>
                {errors.nombre && <span>El campo es requerido</span>}
                <label htmlFor="lastName">Apellido</label>
                <input id='lastName' placeholder='Apellido' {...register('apellido', {required: true})}></input>
                {errors.apellido && <span>El campo es requerido</span>}
                <label htmlFor="phone">Teléfono</label>
                <input type='text' id='phone' placeholder="3492123456"{...register('telefono', {required: true, pattern:/^[0-9]{10}$/})}></input>
                {errors.telefono && errors.telefono.type === "required" && (<span>El campo es requerido.</span>)}
                {errors.telefono && errors.telefono.type === "pattern" && (<span>El campo debe tener como máximo 10 dígitos y sin caracteres.</span>)}
                <label htmlFor="description" type='text'>Descripción</label>
                <textarea rows='3' id='description' placeholder="Ingresa una descripción del arquitecto..." {...register('descripcion', {required: true})}></textarea>
                {errors.descripcion && <span>El campo es requerido</span>}

                <button className="btn-save"><FontAwesomeIcon className="icon" icon={faFloppyDisk} />Guardar</button>
            </form>
            { params.id && <button className="eliminar-btn" onClick={deleteArquitectoBtn}><FontAwesomeIcon icon={faTrash} className="icon"/>Eliminar</button>}
        </>
    )
}