import React, { useState } from "react";
import '../../styles/Product.scss';
import get_images from "../../get_images";
import { useSelector } from 'react-redux'

import api from '../../httpService'

const images = get_images()

function Product() {

    const theme = useSelector(state => state.theme.theme)
    const [image, setImage] = useState(images[0])

    const addToCart = () => {
        api.post('/postcart', { name: image.split('/')[3].split('.')[0] })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <main>
            <div className={`content ${theme}`}>
                <h1 className="product-title"> Handmade cute sweater for cat</h1>
                <div className="image-container">
                    <img src={image} alt="cat in sweater" className="product-main-img" />
                    <form className={`product-info ${theme}`}>
                        <div className="stls-container">
                            {images.map((item, index) =>
                            (
                                <label onClick={() => { setImage(images[index]) }} key={index}>
                                    <input type="radio" id={`style${index + 1}`} name="swtr-stl" className="swtr-stl" />
                                    <img src={item} alt="cat in sweater" className={`product-image ${theme}`} />
                                </label>
                            )
                            )}

                        </div>
                        <p className="product-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nulla magnam tempora similique beatae, maiores officiis excepturi eligendi iusto fugiat
                            eveniet, suscipit cupiditate quaerat voluptates dignissimos repudiandae accusantium.
                            Deserunt, cum doloremque.</p>
                        <div className="price">
                            <label>100$</label>
                            <input type="button" className={`order-btn ${theme}`} value="Add to cart" onClick={addToCart} />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Product;