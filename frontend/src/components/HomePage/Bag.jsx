import React from "react";
import { useSelector } from 'react-redux'
import bag from '../../images/bag.jpg';
import '../../styles/Bag.scss';

function Bag() {
    const theme = useSelector(state => state.theme.theme)

    return (
        <div className={`bag ${theme}`}>
            <div className="card-text">
                <h3>Lorem ipsum</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus blanditiis, a inventore excepturi porro aut doloribus maxime veniam velit explicabo illum? Dolore fugiat enim reiciendis</p>
                <a href="#"><button className={`more-btn ${theme}`}>Learn more</button></a>
            </div>
            <img src={bag} alt="bag" className="bag-image" />
        </div>
    )
}

export default Bag;