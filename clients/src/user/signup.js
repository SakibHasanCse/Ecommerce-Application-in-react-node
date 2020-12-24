import React , {useState ,useEffect} from 'react';
import Layout from "../shop/layout";
import { API } from '../config';





const Signup = () => {
    const [user, setUser] = useState('')

    const submitFrom =(e)=>{
        e.preventDefault();
        
    }



    
    const signupForm = ()=>(
        <form>
           <div className="form-group">
               <label className="text-muted">Name</label>
               <input type="text" className="form-control" name="name" placeholder="" />
           </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" name="email" placeholder="" />
            </div><div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" name="password" placeholder="" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
    return (
         
        <Layout title="Signup Page" description="This is the Signup page" className="container col-md-8 offset-md-2">
            {signupForm()}
        </Layout>
 
    );
}

export default Signup;
