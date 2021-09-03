import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import StorePage from '../StorePage'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import '../../App.css'

const header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)

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
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <span id="cart" className="ml-3">Košarica</span>
                        <span className="ml-1" id="cart_count">2</span>
                    </Link>

                    {/* Ako je korisnik prijavljen, u headeru se prikazuje korisnik, u protivnom se pokazuje gumb za login */}
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white" type="button" id="dropDownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />

                                </figure>
                                <span>{user && user.name}</span>

                            </Link>
                            <div className="dropdown-menu" id="dropdownmenu" aria-labelledby="dropDownMenuButton">

                                {user && user.role !== 'admin' ? (
                                    <Link className="dropdown-item" to="/orders/me">Moje narudžbe</Link>
                                ) : (
                                    <Link className="dropdown-item" to="/dashboard">Kontrolna ploča</Link>

                                )}
                                <Link className="dropdown-item" to="/me">Profil</Link>

                                <Link className="dropdown-item text-danger" to="/">
                                    Odjavite se
                                </Link>
                            </div>

                        </div>
                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}


                </div>
            </nav>
        </Fragment>
    )
}

export default header
