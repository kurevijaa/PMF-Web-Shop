import React, { useState, Fragment, useEffect } from "react";
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';


import Product from "./product/Product"
import '../App.css'
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions'


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

function StorePage({ match }) {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])


    //react hooks useEffect, useAlert
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price));


    }, [dispatch, alert, error, keyword, currentPage, price])

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

                    {keyword ? (
                        <Fragment>
                            <div className="col-6 col-md-3 mt-5 mb-5">
                                <div className="px-5">
                                    <Range
                                        marks={{
                                            1: `1kn`,
                                            1000: `1000kn`
                                        }}
                                        min={1}
                                        max={1000}
                                        defaultValue={[1, 1000]}
                                        tipFormatter={value => `kn${value}`}
                                        tipProps={{
                                            placement: 'top',
                                            visible: true
                                        }}
                                        value={price}
                                        onchange={price => setPrice(price)}
                                    />
                                </div>
                            </div>
                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products && products.map(product => (
                                        <Product key={product._id} product={product} col={4} />
                                    ))}
                                </div>
                            </div>
                        </Fragment>

                    ) : (
                        products && products.map(product => (
                            <Product key={product._id} product={product} col={3}/>
                        ))
                    )}

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
