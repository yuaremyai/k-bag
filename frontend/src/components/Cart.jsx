import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import '../styles/Cart.scss';

import api from '../httpService';
import { useState } from "react";

import get_images from "../get_images";
const images = get_images()


function Cart({ refreshToken }) {
    const theme = useSelector(state => state.theme.theme)

    const [data, getData] = useState('')

    const getCart = () => {
        api.get('/getcart')
            .then((response) => {
                getData(response.data.products)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    refreshToken()
                }
            })
    }

    const removeProduct = (item) => {
        api.post('/removecart', { name: item[0] })
            .then((response) => {
                getCart()
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    refreshToken()
                }
                else console.log(error)
            })
    }

    useEffect(() => {
        getCart()
    }, [])

    if (Object.keys(data).length === 0) {
        return (
            <div className={`cart empty ${theme}`}>
                <h1>The cart is empty</h1>
                <Link to={'/product'} className={`cart-to-products ${theme}`}>Look for goods</Link>
            </div>
        )
    }

    return (
        <div className={`cart ${theme}`}>
            {Object.entries(data).map((item) =>
            (
                <div className={`product-card ${theme}`} key={item[0]}>
                    <img src={images.filter(el => el.indexOf(item[0]) !== -1)} alt='' className='card-image' />
                    <div className="card-text">
                        <div className="card-product-title">{item[0]}</div>
                        <div className="product-price">price: {item[1].price}</div>
                        <div className="product-count">count: {item[1].count}</div>
                    </div>
                    <div className="card-button">
                        <input type='button' className={`remove-button ${theme}`} value='Remove' onClick={event => removeProduct(item)} />
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default Cart