import Layout from "../shop/layout";
import React, { useState,  } from 'react';
import { Redirect} from 'react-router-dom'
import { authonticate, signin } from './../auth/index';




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
    
    const { email, password, error, loading, redirectToReferrer} = values

    const fromSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false ,loading:true })
        signin({ email, password })
            .then((res) => {
                if (res.error) {
                    setValues({ ...values, error: res.error, loading: false })
                } else {
                   authonticate(res , ()=>{
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
                <input type="email" onChange={handleChange("email")}  value={email} className="form-control" name="email" placeholder="" />
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

    const showLodiing = () =>{
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
        }
const redirectUser = () =>{
    if(redirectToReferrer){
        return <Redirect to="/"/>
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
