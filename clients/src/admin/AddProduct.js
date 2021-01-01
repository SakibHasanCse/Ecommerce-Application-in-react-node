
import React, { useEffect, useState } from 'react';
import { isAuthnticated } from '../auth/index';
import Layout from '../shop/layout';
import { AllCategoryAPi, ProdductAPi } from './adminApi';

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

    const { user, token } = isAuthnticated()
 const init = () => {
        AllCategoryAPi()
            .then(result => {
                if (result.error) {

                    setValues({ ...values, error: result.error })
                }
                setValues({ ...values, error: '', categories: result.data, formData: new FormData() })

            }).catch(err => {
                setValues({ ...values, error: err })

            })
    }
    useEffect(() => {
        init()
    }, [])

   
    const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })

}
    const submitHandeler = (e) => {
        e.preventDefault()
        setValues({ ...values, error: '', createdProduct:'' , loading: true })
        ProdductAPi(user._id, token, formData)
            .then(result => {
                if (result.error) {
                
                    setValues({ ...values, error: result.error })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo: "",
                        price: "",
                        quntity: "",
                        loading: false,
                       createdProduct: result.name })
    }
}).catch (err => {
    setValues({ ...values, error: err })

})
    }

                



const successMsg = () => (

    
    
    <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
        <h2>
            {`${createdProduct} is Created`}

        </h2>

    </div>

)

console.log(error)
const errorMsg = () => (

    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>

        <h2>
            {error}

        </h2>

    </div>
        )



const showLodiing = () => (
    loading && (
        <div className="alert alert-success">
            <h2>
                Loading ....
                   </h2>
        </div>
    )

)

const newProductFrom = () => {
    return (
        <form onSubmit={submitHandeler} className="mb-5">
            <h4>Product Photo</h4>
            <div className="form-group">
                <label htmlFor="" className="btn btn-secondary">

                    <input type="file" onChange={handleChange('photo')} name="photo" accept="image/*" className="form-control" />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Product Title</label>
                <input type="text" onChange={handleChange('name')} value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Product Price</label>
                <input type="number" onChange={handleChange('price')} value={price} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Product Quntity</label>
                <input type="number" onChange={handleChange('quntity')} value={quntity} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Product Category</label>
                <select className="form-control" onChange={handleChange('category')} >

                    <option>Please Select</option>
                    {categories &&
                        categories.map((cat, i) => (
                            <option key={i} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>



            <div className="form-group">
                <label htmlFor="" className="text-muted">Product Shipping</label>
                <select className="form-control" onChange={handleChange('shipping')} >
                    <option >Please Select</option>

                    <option value="0">NO</option>
                    <option value="1">Yes</option>
                </select>
            </div>



            <div className="form-group">
                <label htmlFor="" className="text-muted">Product Description</label>
                <textarea onChange={handleChange('description')} value={description} className="form-control" />
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )
}



return (
    <Layout title="Add New Product" description={`Hey ${user.name} , Ready To Add New Product`} className="container">
        <div className="row">
            <div className="col-md-8 offset-md-2">
                {errorMsg()}
                {showLodiing()}
                {successMsg()}
                {newProductFrom()}
            </div>
        </div>
    </Layout>
)

}
export default CreateProduct