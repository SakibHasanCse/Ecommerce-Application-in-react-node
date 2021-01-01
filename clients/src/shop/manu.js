import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logoutauthorized } from '../auth/index';
import { isAuthnticated } from './../auth/index';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    return { color: '#ffffff' }

}
const Menu = ({ history }) => (


    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>

            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">Shop</Link>

            </li>
            


            {isAuthnticated() && isAuthnticated().user.role === 'user' && (

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/dashbord")} to="/dashbord">Dashboard</Link>
                </li>
            )}
            {isAuthnticated() && isAuthnticated().user.role === 'admin' && (


                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/admin/dashbord")} to="/admin/dashbord">Dashboard</Link>
                </li>
            
                
            )}

            {!isAuthnticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin</Link>

                    </li>
                </Fragment>
            )}

            {isAuthnticated() && (
                <div>

                    <li className="nav-item">
                        <span className="nav-link" onClick={() => logoutauthorized(() => {
                            history.push('/')
                        })} style={{ cursor: 'pointer', color: '#ffff' }} logoutauthoriz >Signout</span>

                    </li>
                </div>
            )}



        </ul>
    </div>



)
export default withRouter(Menu)