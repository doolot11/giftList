import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Error = () => {
    return (
        <CartError>
            <section className="page_404">
                <h1>Error!</h1>
                <img
                    src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                    alt="gif"
                />
                <div className="contant_box_404">
                    <h4>
                        We are sorry, the page you requested could not be found
                        &#10006;
                    </h4>
                    <Link
                        to="/"
                        href="https://instagram.com/abol.codes"
                        className="link_404"
                    >
                        Go to Home
                    </Link>
                </div>
            </section>
        </CartError>
    )
}
export default Error
const CartError = styled.div`
    & .page_404 {
        background: #ffff;
        font-family: 'Inter';
        text-align: center;
        & h1 {
            padding: 0px;
            margin: 0px;
            position: absolute;
            left: 48%;
            top: 95px;
            font-family: 'Inter';
        }
        & img {
            width: 670px;
            height: auto;
        }
    }
    & .link_404 {
        color: #ffff !important;
        padding: 10px 20px;
        background-color: #8639b5;
        width: 400px;
        font-family: 'Inter';
        border-radius: 30px;
        height: 30px;
        display: inline-block;
        font-family: 'Inter';
        text-decoration: none;
    }
    & .contant_box_404 {
        margin-top: -50px;
        & h4 {
            color: #abaeb6;
            font-size: large;
            font-family: 'Inter', sans-serif;
        }
    }
`
