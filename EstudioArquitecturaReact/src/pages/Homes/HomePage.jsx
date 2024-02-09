import { NavMenuHome } from "../../components/NavMenu";
import './HomePage.css';
import { Galeria } from "../../components/Galeria";
import { ImportantProjects } from "../Proyectos/ImportantProjects";
import { Footer } from "../../components/Footer";
import { TitlePages } from '../../components/TitlePages';
import { Proyectos } from "./Proyectos";

export function HomePage(){
    return(
        <>
            <div>
                <NavMenuHome></NavMenuHome>
                <Galeria></Galeria>
                <TitlePages title='Proyectos Importantes'></TitlePages>
                <ImportantProjects></ImportantProjects>
                <TitlePages title='Nuestros proyectos'></TitlePages>
                <Proyectos></Proyectos>
                <Footer></Footer>
            </div>
        </>
    );
}
