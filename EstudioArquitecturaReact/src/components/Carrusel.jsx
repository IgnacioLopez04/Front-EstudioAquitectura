import { useState } from "react"

export function Carrusel({pjIndex, imagenes}){

    const [lugar, setLugar] = useState(0);

    const moverIzquierda = ()=>{

        if (lugar < (imagenes.length-1) * -50){
            setLugar(lugar - 50);
        }else{
            setLugar(-0);
        }
    }

    const moverDerecha = ()=>{

        if (lugar > (imagenes.length-1) * -50){
            setLugar(lugar - 50);
        }else{
            setLugar(-0)
        }
    }

    return(
        <>
            <div className="btns-img">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" onClick={moverIzquierda}>
                {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" onClick={moverDerecha}>
                {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                </svg>
            </div>
            <div className="grande" key={pjIndex} style={{transform: `translateX(${lugar}%)`}}>
                {imagenes.map((img, subIndex)=>
                    <img 
                    key={subIndex} 
                    src={`${img.url}`} 
                    alt="imagenes" 
                    className="img"
                    ></img>
                )}
            </div>
        </>
    )
}