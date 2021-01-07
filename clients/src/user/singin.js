import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from "../shop/layout";
import { authonticate, isAuthnticated, signin } from './../auth/index';




const Singin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        loading: false,
        error: '',
        redirectToReferrer: false
    })

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }
    const { user } = isAuthnticated()
    const { email, password, error, loading, redirectToReferrer } = values

    const fromSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then((res) => {
                if (res.error) {
                    setValues({ ...values, error: res.error, loading: false })
                } else {
                    authonticate(res, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    })

                }
            })
    }

    const signupForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange("email")} value={email} className="form-control" name="email" placeholder="" />
            </div><div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange("password")} value={password} className="form-control" name="password" placeholder="" />
            </div>
            <button onClick={fromSubmit} className="btn btn-primary">Login</button>
        </form>
    )

    const errorMessage = () =>
    (<div className="alert alert-danger" role="alert" style={{ display: error ? '' : 'none' }} >
        {error}
    </div>)

    const showLodiing = () => {
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    }
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user.role === 'admin') {
                return <Redirect to="/admin/dashbord" />

            }
            return <Redirect to="/dashbord" />
        }
        if(isAuthnticated()){
            return <Redirect to="/" /> ;
        }
    }




    return (
        <Layout title="Signin Page" description="This is the Signin page" className="container">
            {showLodiing()}
            {errorMessage()}
            {signupForm()}
            {redirectUser()}
        </Layout>

    );
}

export default Singin;
