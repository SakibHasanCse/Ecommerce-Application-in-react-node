
import React, { useState ,useEffect } from 'react';
import { isAuthnticated } from '../auth/index';
import Layout from '../shop/layout';




const CreateProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        photo: "",
        price: "",
        category: "",
        shipping: "",
        categories: [],
        quntity: "",
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''

    })

    const { name,
        description,
        price,
        category,
        shipping,
        categories,
        quntity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData } = values

    const { user } = isAuthnticated()
        useEffect(() => {
          setValues({...values ,formData : new FormData()})
        }, [])

    const handleChange = name => e=>{
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name ,value)
        setValues({...values, [name]: value})

    }
    const submitHandeler = (e) => {
        e.preventDefault()
    }

    const newProductFrom = () => {
        return (
            <form onSubmit={submitHandeler} className="mb-5">
                <h4>Product Photo</h4>
                <div className="form-group">
                    <label htmlFor="" className="btn btn-secondary">

                        <input type="file" onChange={handleChange('photo')}  name="photo" accept="image/*" className="form-control" />
                    </label>
                </div>
                 
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Product Title</label>
                        <input type="text" onChange={handleChange('name')}  value={name} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Product Price</label>
                        <input type="number" onChange={handleChange('price')}  value={price} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Product Quntity</label>
                        <input type="number" onChange={handleChange('quntity')}  value={quntity} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Product Category</label>
                        <select className="form-control"  onChange={handleChange('category')} >

                            <option value="5fecf2820dcf973a74347b07">MacBook</option>
                        </select>
                </div>

               
                
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Product Shipping</label>
                        <select className="form-control"  onChange={handleChange('shipping')} >

                            <option value="0">NO</option>
                            <option value="1">Yes</option>
                        </select>
                </div>



                <div className="form-group">
                    <label htmlFor="" className="text-muted">Product Description</label>
                        <textarea  onChange={handleChange('description')}  value={description} className="form-control" />
                </div>
                    <button className="btn btn-outline-primary">Create Product</button>
            </form>
        )
    }



    return (
        <Layout title="Add New Product" description={`Hey ${user.name} , Ready To Add New Product`} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newProductFrom()}
                </div>
            </div>
        </Layout>
    )

}
export default CreateProduct