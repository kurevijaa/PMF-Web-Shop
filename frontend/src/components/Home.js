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
                    src="/images/carousel imgs/test1.jpg"
                    alt="First slide"
                    height="550px"
                    centerPadding="300"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>
                <img
                    class="carousel-item"

                    className="d-block w-100"
                    src="/images/carousel imgs/test2.jpg"
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
                    src="/images/carousel imgs/test3.jpg"
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

