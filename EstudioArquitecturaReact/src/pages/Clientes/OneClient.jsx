import { NavMenu } from '../../components/NavMenuAdmin';
import { ProjectsPage } from '../Proyectos/ProjectsPage';
import { NewClientsPage } from "./NewClientsPage";
import './OneClient.css'
import '../Proyectos/NewProject.css';

export function OneClient(){
    return(
        <>
            <NavMenu></NavMenu>
            <NewClientsPage></NewClientsPage>
            <ProjectsPage></ProjectsPage>
        </>
    )
}