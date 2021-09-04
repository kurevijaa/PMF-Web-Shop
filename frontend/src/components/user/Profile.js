import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div class="heading-background">
                        <h2 id="products-heading">Moj profil</h2>
                    </div>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <br></br>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block mt-5">
                                Uredi
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Ime i prezime</h4>
                            <p>{user.name}</p>

                            <h4>Email adresa</h4>
                            <p>{user.email}</p>

                            <h4>Pridružio/la se</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>


                            {user.role !== 'admin' && (
                                <Link to="/orders/me" id="myordersbtn" className="btn btn-danger btn-block mt-5">
                                    Moje narudžbe
                                </Link>
                            )}
                            <br />
                            <Link to="/password/update" id="changepassbtn" className="btn btn-primary btn-block mt-3">
                                Izmjena lozinke
                            </Link>


                        </div>
                    </div>
                </Fragment>
            )}
            <br />
            <div class="home-upperbottom"></div>
            <hr></hr>

        </Fragment>
    )
}

export default Profile
