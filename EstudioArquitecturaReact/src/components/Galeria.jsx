import { useEffect, useState } from "react"
import { getImagesGallery } from "../api/home.api";

export function Galeria(){

    const [gallery, setGallery] = useState([]);
    useEffect(()=>{
        async function loadGallery(){
            const res = await getImagesGallery();
            setGallery(res.data.imagenes);
        }
        loadGallery();
    }, [])

    return(
        <>
            {gallery.length < 5 && <></> ||
                <section className="galeria">
                    {gallery.map( image =>(
                        <img src={`${image}`} ></img>
                    ))}
                </section>
            }
        </>
    )
}