import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import StorePage from '../StorePage'

import '../../App.css'

const header = () => {
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <a href='/'><img src="/images/pmfshop.png" width="75" height="75" /></a>
                        <a href="/Trgovina" id="tab1">Trgovina</a>

                    </div>


                    
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>

                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">2</span>
                </div>
            </nav>
        </Fragment>
    )
}

export default header
