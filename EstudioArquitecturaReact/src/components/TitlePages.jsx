import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export function TitlePages({title, text, onClickModal}){

    const location = useLocation();

    if(location.pathname.includes('inicio')){
        text = null;
    }

    return(
        <div className="title-btn">
            <h1>{title}</h1>
            {text && <button onClick={()=>{onClickModal();}}><FontAwesomeIcon icon={faCirclePlus} className="icon"/>{text}</button>}
        </div>
    )
}