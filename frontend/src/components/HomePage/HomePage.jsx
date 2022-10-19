import React from "react";
import { useState } from "react";
import Bag from './Bag';
import Carousel from "./Carousel";
import get_images from '../../get_images'

const images = get_images()

function HomePage(){

    const[image, setImage] = useState(images[0])

    // Changes image shown on the page 
    function carousel(isLeft){
        let i = images.indexOf(image)
        if (isLeft){
            i = (i-1 < 0) ? images.length-1 : i-1
            setImage(images[i])
        }
        else {
            i = (i+1 > images.length - 1) ? 0 : i+1
            setImage(images[i])
        }
    }
    
    return(
        <main className="main">
            <Bag/>
            <Carousel carousel={carousel} image={image}/>
        </main>
    )
}

export default HomePage;