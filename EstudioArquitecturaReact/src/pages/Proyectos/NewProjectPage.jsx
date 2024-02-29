import { useContext, useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import { getAllClients } from "../../api/clients.api";
import { createProject,updateProject, getProject, getImagesProject, deleteImage} from '../../api/projects.api'
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext";

export function NewProjectPage({cerrarModal, idProject, loads}){

    const [imagenes, setImagenes] = useState([]);
    const [clients, setClients] = useState([]);
    useEffect(()=>{
        async function loadClients(){
            const clients = await getAllClients();
            setClients(clients.data);
        }
        loadClients();
    }, [])

    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm();
    
    // Crear o actualizar un proyecto
    const onSubmit = handleSubmit( async data=>{
        if (idProject != undefined){
            await updateProject(idProject, data);
            toast.success('Proyecto actualizado!');
            loads();
        }else{
            createProject(data);
            toast.success('Carga exitosa!');
            loads();
        }
        loads();
        cerrarModal();
    })

    useEffect(()=>{
        async function loadProject(){
            if (idProject != undefined){
                const resPj = await getProject(idProject);
                setValue('nombre', resPj.data.nombre);
                setValue('direccion', resPj.data.direccion);
                setValue('ciudad', resPj.data.ciudad);
                setValue('descripcion', resPj.data.descripcion);
                setValue('cliente', resPj.data.cliente);
                setValue('esPrivado', resPj.data.esPrivado)
                setValue('destacado', resPj.data.destacado)
                setValue('metrosCubiertos', resPj.data.metrosCubiertos)
                setValue('metrosTotales', resPj.data.metrosTotales)
                setValue('habitaciones', resPj.data.habitaciones)
                setValue('baños', resPj.data.baños)
                const resImg = await getImagesProject(idProject);
                setImagenes(resImg.data.imagenes);
                setValue('imagenes', resImg.data.imagenes);
            }
        }
        loadProject();
    }, [])

    const handleFileSelect = (event) => {
        setValue('imagenes',event.target.files);
    };

    let {authTokens, logoutUser} = useContext(AuthContext);

    const handleDelete = async (image, idProject) => {
        const nameArray = image.split('/');
        let name = nameArray[nameArray.length - 1];
        name = name.replace(/\.jpg$/, "");

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${String(authTokens.access)}`,
        };

        try{
            await deleteImage(name, idProject, headers);
            toast.success('Imagen eliminada.');
        }catch(e){
            if(e.response.status == 401){
                logoutUser();
            }else{
                toast.error('No se ha podido eliminar la imagen.')
            }
        }
    }

    return(
        <>
            <form onSubmit={onSubmit} className="form-pj" encType="multipart/form-data" method="post">
                <label htmlFor='name'>Nombre</label>
                <input type='text' placeholder='Casa de Juan' id='name' {...register("nombre", {required: true})}></input>
                {errors.nombre && <span>El campo es requerido</span>}
                <div className="direccion-div">   
                    <div className="dic">
                        <label htmlFor="address">Direccion</label>
                        <input id="address" type="text" placeholder="Av. Siempre Viva 748" {...register("direccion", {required: true})}></input>
                        {errors.direccion && <span>El campo es requerido</span>}
                    </div>
                    <div className="dic">
                        <label htmlFor="city">Ciudad</label>
                        <input id="city" type="text" placeholder="Rafaela" {...register("ciudad", {required: true})}></input>
                        {errors.ciudad && <span>El campo es requerido</span>}
                    </div>
                </div>
                <div className="caract">
                    <div>
                        <label htmlFor="mtros-cubiertos">Metros cubiertos</label>
                        <input id='mtros-cubiertos' type='number' placeholder="154" { ... register('metrosCubiertos', {required: true})}></input>
                    </div>
                    <div>
                        <label htmlFor="mtros-totales">Metros terreno</label>
                        <input id='mtros-totales' type='number' placeholder="300" { ... register('metrosTotales', {required: true})}></input>
                    </div>
                    <div>
                        <label htmlFor="room">Habitaciones</label>
                        <input id='room' type='number' placeholder="2" { ... register('habitaciones', {required: true})}></input>
                    </div>
                    <div>
                        <label htmlFor="baños">Baños</label>
                        <input id='baños' type='number' placeholder="2" { ... register('baños', {required: true})}></input>
                    </div>
                </div>
                <label htmlFor="description">Notas</label>
                <textarea rows='3' id="description" type="text" placeholder="Notas..." {...register("descripcion", {required: false})}></textarea>
                <div className="cl-priv">
                    <div>
                        <label htmlFor='client'>Clientes</label>
                        <select id='client'  {...register("cliente", {required: true})}>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                    {client.nombre}
                            </option> 
                        ))}
                        </select>
                        {errors.cliente && <span>El campo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="private">Privado</label>
                        <input type="checkbox" id="private" {... register('esPrivado', {required: false})}></input>
                    </div>
                    <div>
                        <label htmlFor="private">Destacado</label>
                        <input type="checkbox" {... register('destacado', {required: false})}></input>
                    </div>
                </div>
                <input type='file' className="imagenes" name='imagenes' multiple  onChange={handleFileSelect}></input>
                <div className="cont-1-imgs">
                    <div className="cont-2-imgs">
                    {idProject != undefined && 
                        imagenes.map((image)=>(
                            <div key={image.id} className="existing-image">
                                <img src={`${image}`}></img>
                                <button className="delete-image" onClick={ ()=> handleDelete(image, idProject)}>X</button>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <button className="btn-save"><FontAwesomeIcon className="icon" icon={faFloppyDisk}/>Guardar</button>
            </form>
        </>
    );
}
