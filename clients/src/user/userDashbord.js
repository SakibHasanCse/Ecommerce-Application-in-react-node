import React from 'react';
import { isAuthnticated } from '../auth';
import Layout from '../shop/layout';
import { Link } from 'react-router-dom';

const userDashbord = () => {
    const { user: { name, email, role } } = isAuthnticated()

    const userLinks = () => (
        <div className="card">
            <h3 className="card-header">Dashboard</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/cart">My Cart</Link>
                    
                </li>
                <li className="list-group-item">
                    <Link to="/profile/update">Update Profile</Link>
                </li>
             
            </ul>
        </div>
    )


    const userInformations = () => (

        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 'admin' ? 'Administrator' : 'Registed Account'}</li>
            </ul>
        </div>
    )

    const userHistory = () => (
        <div className="card">
            <h3 className="card-header">Purchased History</h3>
            <ul className="list-group">
                <li className="list-group-item">histor</li>

            </ul>
        </div>
    )


    return (
        <Layout title="Dashboard" description={`Hey , ${name}`} className="container">
            <div className="row">

                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                {userInformations()}
                {userHistory()}
                </div>
            </div>

        </Layout>
    )
}
export default userDashbord