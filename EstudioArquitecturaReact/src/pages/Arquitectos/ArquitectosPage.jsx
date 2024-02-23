import { useEffect, useState } from "react"
import { getAllArquitectos } from "../../api/arquitectos.api";
import { NavMenu } from "../../components/NavMenuAdmin";
import './Arquitectos.css'
import { TitlePages } from "../../components/TitlePages";
import { Modal } from "../../components/Modal";
import { DeseaEliminar } from "../../components/DeseaEliminar";
import { NewArquitectoPage } from '../Arquitectos/NewArquitectoPage';
import { deleteArquitecto } from "../../api/arquitectos.api"; 


export function ArquitectosPage(){

    const [estadoModal, setEstadoModal] = useState(false);
    const [arquitectos, setArquitectos] = useState([]);
    const [estadoModalEliminar, setEliminar] = useState(false);
    const [idArq, setId] = useState(undefined);
    const [estadoEditar, setEditar] = useState();
    
    async function loadArquitectos(){
        const res = await getAllArquitectos();
        setArquitectos(res.data);
    }

    useEffect(()=>{
        loadArquitectos();
    }, []);

    const openModalEliminar = (id)=>{
        setId(id);
        setEliminar(!estadoModalEliminar);
    }

    const closeModalEliminar = ()=>{
        setEliminar(!estadoModalEliminar);
    }

    const openModalEditar = (id)=>{
        setId(id);
        setEditar(!estadoEditar);
    }

    const closeModalEditar = ()=>{
        setEditar(!estadoEditar);
    }

    const openModal = ()=>{
        setEstadoModal(!estadoModal);
    };

    const closeModal = ()=>{
        setEstadoModal(!estadoModal);
    }


    return(
        <>
            <NavMenu></NavMenu>
            <TitlePages title='Arquitectos' href='/estudio/arquitectos/nuevo' text='Nuevo Arquitecto' onClickModal={openModal}></TitlePages>
            {arquitectos.map( arquitecto =>(
                <div key={arquitecto.id} className="div-arqs">
                    <h2 className="arq-name"  >{arquitecto.nombre} {arquitecto.apellido}</h2>
                    <p className="arq-desc">{arquitecto.descripcion}</p>
                    <div className="div-btn">
                        <button onClick={()=>{openModalEliminar(arquitecto.id);}}>Eliminar</button>
                        <button onClick={()=>{openModalEditar(arquitecto.id);}}>Editar</button>
                    </div>
                </div>
            ))}
            <Modal estado={estadoModal} cambiarEstado={closeModal} title='Nuevo arquitecto'>
                <NewArquitectoPage cerrarModal={closeModal} funcion={loadArquitectos}></NewArquitectoPage>
            </Modal>
            <Modal estado={estadoModalEliminar} cambiarEstado={closeModalEliminar} title='Eliminar arquitecto'>
                <DeseaEliminar funcion={deleteArquitecto}  id={idArq} cancelar={closeModalEliminar} aceptar={closeModalEliminar} loads={loadArquitectos}></DeseaEliminar>
            </Modal>
            <Modal estado={estadoEditar} cambiarEstado={closeModalEditar} title='Editar arquitecto'>
                <NewArquitectoPage cerrarModal={closeModalEditar} idArq={idArq} funcion={loadArquitectos}></NewArquitectoPage>
            </Modal>
        </>
    )
}