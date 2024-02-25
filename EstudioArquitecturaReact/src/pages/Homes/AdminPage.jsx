import { NavMenu } from '../../components/NavMenuAdmin';
import { TitlePages } from '../../components/TitlePages';
import { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import './AdminPage.css'
import { createStudio, getStudio } from '../../api/estudio.api';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

function DataStudio(){

    const {register, handleSubmit, formState: {errors}, setValue } = useForm(); 
    const [studio, setStudio] = useState(undefined)

    useEffect(()=>{
        async function loadEstudio(){
            const res = await getStudio();
            setStudio(res.data);
            setValue('nombre',res.data[0].nombre);
            setValue('descripcion',res.data[0].descripcion);
            setValue('correo', res.data[0].correo);
            setValue('direccion', res.data[0].direccion);
        }
        loadEstudio();
    }, [])

    const onSubmit = handleSubmit(async data =>{
        await createStudio(data);
        toast.success('Datos del estudio actualizados');
    })

    if( studio === undefined){
        return(
            <div className='loading-div'></div>
        )
    }
    return(
        <>
            <form onSubmit={onSubmit} className='form-studio'>
                <label htmlFor='name'>Nombre</label>
                <input id='name' type='text' {... register('nombre', {required:true})}></input>
                <label htmlFor='direccion'>Direccion</label>
                <input id='direccion' type='text' {... register('direccion', {required:true})}></input>
                <label htmlFor='email'>Correo Electrónico</label>
                <input id='email' type='text' {... register('correo', {required:true})}></input>
                <label htmlFor='description'>Descripción</label>
                <textarea rows={4} id='description' type='text' {... register('descripcion', {required:true})}></textarea>
                <button><FontAwesomeIcon icon={faFloppyDisk} className='icon'></FontAwesomeIcon>Guardar</button>
            </form>
        </>
    )
}

export function AdminPage(){

    return(
       <>
            <NavMenu></NavMenu>
            <article className='article-admin'>
                <div className='div-title-p'>
                    <h2>No se, deberia ir un titulo</h2>
                    <p>Aquí podrás configurar la página completa que será visible para tus clientes. 
                    Podrás personalizarla con imágenes de tus proyectos, descripciones detalladas e 
                    información de contacto. Además, tendrás la capacidad de cargar nuevos proyectos, 
                    agregar clientes recientes y incluir a los arquitectos que se unan al estudio en el 
                    futuro.</p>
                </div>
                <img className='img-admin' alt='Aca va una imagen de la fachada del estudio o del estudio'></img>
            </article>
            <TitlePages title='Estudio'></TitlePages>
            <DataStudio></DataStudio>
       </>
    );
}
