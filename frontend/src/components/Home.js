import React, { useState, Fragment, useEffect } from "react";
import { Carousel } from 'react-bootstrap'

import Pagination from 'react-js-pagination'


import Product from "./product/Product"
import '../App.css'
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions'

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)


    //react hooks useEffect, useAlert
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage));


    }, [dispatch, alert, error, keyword, currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
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


            <hr></hr>



            <div class="heading-background">
                <h2 id="products-heading"> Novo u našoj trgovini </h2>
            </div>
            <section id="products" className="container mt-5">
                <div className="row">
                    {products && products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </section>
            {resPerPage <= productsCount && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'Slijedeća'}
                        prevPageText={'Prethodna'}
                        firstPageText={'Prva'}
                        lastPageText={'Posljednja'}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )}
            <div class="home-upperbottom"></div>
            <hr></hr>
        </Fragment>
    )
};
export default Home

