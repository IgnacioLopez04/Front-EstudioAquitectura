import { useEffect, useState } from "react"
import { getAllClients } from '../../api/clients.api'
import { useNavigate } from "react-router-dom";
import { NavMenu } from "../../components/NavMenuAdmin";
import './Client.css'
import { TitlePages } from "../../components/TitlePages";
import { NewClientsPage } from "./NewClientsPage";
import { Modal } from "../../components/Modal";


export function ClientsPage(){  
    
    const [estadoModal, setEstadoModal] = useState(false);
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadClients(){
            const res = await getAllClients();
            setClients(res.data);
        }
        loadClients();
    }, [estadoModal])

    const openModal = ()=>{
        setEstadoModal(!estadoModal);
    };

    const closeModal = ()=>{
        setEstadoModal(!estadoModal);
    }


    return(
        <>
            <NavMenu></NavMenu>
            <TitlePages title='Clientes' text='Nuevo Cliente' onClickModal={openModal}></TitlePages>
            <article className="clients">
                {clients.map(client => (
                    <div key={client.id} onClick={()=>{navigate(`/estudio/clientes/${client.token}/`)}}>
                        <h2 className="ct-name">{client.nombre} {client.apellido}</h2>
                        <p className="ct-dni">DNI:{client.dni}</p>
                    </div>
                ))}
            </article>
            <Modal estado={estadoModal} cambiarEstado={closeModal} title='Nuevo Cliente'>
                <NewClientsPage cambiarEstado={closeModal}></NewClientsPage>
            </Modal>
        </>
    )
}