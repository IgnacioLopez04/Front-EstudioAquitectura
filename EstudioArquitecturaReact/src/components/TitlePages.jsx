
export function TitlePages({title, text, onClickModal}){

    return(
        <div className="title-btn">
                <h1>{title}</h1>
                {text && <button onClick={()=>{onClickModal();}}>{text}</button>}
        </div>
    )
}