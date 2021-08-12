import React, { useState, Fragment, useEffect } from "react";
import Pagination from 'react-js-pagination'


import Product from "./product/Product"
import '../App.css'
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions'


function StorePage({ match }) {

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
            <div class="heading-background">
                <h2 id="products-heading"> Proizvodi </h2>
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
}

export default StorePage
