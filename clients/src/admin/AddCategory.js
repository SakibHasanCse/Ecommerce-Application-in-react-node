
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthnticated } from '../auth/index';
import Layout from '../shop/layout';
import { CategoryAPi } from './adminApi';



const CreateCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const { user, token } = isAuthnticated()


    const submitHandeler = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        CategoryAPi(user._id, token, { name })
            .then(result => {

                if (result.error) {
                    setError(result.error)
                } else {
                    setError('')
                    setSuccess(true)
                    setName('')
                }

            }).catch(err =>
                setError(err)
            )
    }



    const successMsg = () => {
        if (success) {

            return <h3 className="text-success">{name} Category is Created</h3>
        }
    }
    const errorMsg = () => {
        if (error) {

            return <h3 className="text-danger">{error}</h3>
        }
    }
    const backButton = () => (
        <div className="mt-5">
            <Link to="/admin/dashbord"
                className="btn btn-warning">
                Back To Dashboard
             </Link>
        </div>
    )
    const changeHandeler = (e) => {
        setError('')
        setName(e.target.value)
    }
    const newCategoryFrom = () => (
        <form onSubmit={submitHandeler}>
            <div className="form-group">
                <label htmlFor="" className="text-muted">New Category</label>
                <input className="form-control" type="text" required onChange={changeHandeler} value={name} autoFocus />
            </div>
            <button type="submit" className="btn btn-outline-primary">Create</button>
        </form>
    )

    return (
        <Layout title="Add New Category" description={`Hey ${user.name} , Ready To Add New Category`} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {errorMsg()}
                    {successMsg()}
                    {newCategoryFrom()}
                    {backButton()}
                </div>
            </div>
        </Layout>
    )

}

export default CreateCategory