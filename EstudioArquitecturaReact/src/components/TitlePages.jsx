import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export function TitlePages({title, text, onClickModal}){

    return(
        <div className="title-btn">
            <h1>{title}</h1>
            {text && <button onClick={()=>{onClickModal();}}><FontAwesomeIcon icon={faCirclePlus} className="icon"/>{text}</button>}
        </div>
    )
}