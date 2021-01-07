import React from 'react';
import { isAuthnticated } from '../auth';
import Layout from '../shop/layout';
import { Link } from 'react-router-dom';

const userDashbord = () => {
    const { user: { name, email, role } } = isAuthnticated()

    const adminLinks = () => (
        <div className="card">
            <h3 className="card-header">Admin Dashboard</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/category">Create Category</Link>
                    
                </li>
                <li className="list-group-item">
                    <Link to="/admin/create/product">Create Product</Link>
                </li>
             
            </ul>
        </div>
    )


    const adminInformation = () => (

        <div className="card mb-5">
            <h3 className="card-header">Admin Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 'admin' ? 'Administrator' : 'Registed Account'}</li>
            </ul>
        </div>
    )

    


    return (
        <Layout title="Dashboard" description={`Hey , ${name}`} className="container">
            <div className="row">

                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                {adminInformation()}
            
                </div>
            </div>

        </Layout>
    )
}
export default userDashbord