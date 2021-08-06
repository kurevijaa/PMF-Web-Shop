import React, { Component, Fragment } from "react";
import { Carousel } from 'react-bootstrap'

import '../App.css'

const Home = () => (
    <Fragment>
        <Carousel fade>
            <Carousel.Item>

                <img
                    class="carousel-item"
                    className="d-block w-100"
                    src="https://res.cloudinary.com/djntlk65g/image/upload/v1628210618/webshop_carousel_imgs/c1_jh59dm.jpg"
                    alt="First slide"
                    height="550px"
                    centerPadding="300"
                />
                <Carousel.Caption>
                    <h3></h3>
                    <p></p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>
                <img
                    class="carousel-item"

                    className="d-block w-100"
                    src="https://res.cloudinary.com/djntlk65g/image/upload/v1628210620/webshop_carousel_imgs/test1_vikfxf.jpg"
                    alt="Second slide"
                    height="550px"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    class="carousel-item"

                    className="d-block w-100"
                    src="https://res.cloudinary.com/djntlk65g/image/upload/v1628210865/webshop_carousel_imgs/159559563_10164847508005608_1455216998607422815_n_v47jzp.jpg"
                    alt="Third slide"
                    height="550px"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </Fragment>
);
export default Home

