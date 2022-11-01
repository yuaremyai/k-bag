import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux'
import '../../styles/Carousel.scss';

function Carousel({ carousel, image }) {
    const theme = useSelector(state => state.theme.theme)

    const [anim, setAnim] = useState(true)
    const [isLeft, setLeft] = useState(null)

    const nodeRef = useRef(null)
    let startX = 0
    let endX = 0

    const animateLeft = () => {
        setAnim(false)
        setLeft(true)
    }

    const animateRight = () => {
        setAnim(false)
        setLeft(false)
    }

    const swipe = (event) => {
        endX = event.changedTouches[0].screenX
        if (startX > endX) {
            setAnim(false)
            setLeft(false)
        }
        else if (startX < endX) {
            setAnim(false)
            setLeft(true)
        }
    }

    return (
        <div className={`sweater ${theme}`}>
            <div className="sweater-text">
                <h1>New produсt</h1>
                <p>New Kate's handmade product is sweaters for cats.
                    <Link to="product" className={`order-link ${theme}`}>Order now!</Link>
                </p>
            </div>

            <div className="carousel">
                <CSSTransition nodeRef={nodeRef} in={anim} timeout={300} classNames="car"
                    onExited={() => { setAnim(true) }}
                    onEnter={() => { carousel(isLeft) }}>
                    <div className="carousel-imgs" ref={nodeRef}
                        onTouchStart={(evt) => {
                            startX = evt.changedTouches[0].screenX
                        }}
                        onTouchEnd={swipe}>
                        <img src={image} alt="cat in sweater" className="carousel-image" />
                    </div>
                </CSSTransition>
                <button className={`carousel-btn ${theme} btn-left`}
                    onClick={animateLeft}>{"<"}</button>
                <button className={`carousel-btn ${theme} btn-right`}
                    onClick={animateRight}>{">"}</button>
            </div>
        </div>
    )
}

export default Carousel;