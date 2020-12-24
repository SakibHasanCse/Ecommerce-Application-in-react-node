import React, { useState } from 'react';
import { API } from '../config';
import Layout from "../shop/layout";
import { signup } from './../auth/index';






const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        success: false,
        error: ''
    })

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }
    console.log(API)
    const { name, email, password, error, success } = values


    // const signup = async(user) => {
    //     console.log(user)
    //     // user = JSON.stringify(user)
    //     console.log(user)

    //     await axios.post(`${API}/signup`,  { user }, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         } })
    //         .then((res) => {
    //             console.log(res)
    //             return res.json()
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    // }
    const fromSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then((res) => {
                if (res.error) {
                    setValues({ ...values, error: res.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        success: true,
                        error: ''
                    })

                }
            })
    }


    const signupForm = () => (
        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange("name")} value={name} className="form-control" placeholder="" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange("email")} value={email} className="form-control" name="email" placeholder="" />
            </div><div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange("password")} value={password} className="form-control" name="password" placeholder="" />
            </div>
            <button onClick={fromSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const errorMessage = () =>
    (<div className="alert alert-danger" role="alert" style={{ display: error ? '' : 'none' }} >
        {error}
    </div>)

    const successMessage = () =>
    (<div className="alert alert-success" role="alert" style={{ display: success ? '' : 'none' }}>
        Account Created Successfully
    </div>)

    return (

        <Layout title="Signup Page" description="This is the Signup page" className="container col-md-8 offset-md-2">
            {errorMessage()}
            {successMessage()}
            {signupForm()}

        </Layout>

    );
}

export default Signup;
