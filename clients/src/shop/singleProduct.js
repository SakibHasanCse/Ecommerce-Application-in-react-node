import React ,{  useState ,useEffect}from 'react'

import Layout from './layout';
import { getProduct } from './shopApi';

const Product = (props) =>{
    const [product ,setProduct] = useState({})
    const [error, setError] = useState(false)

    const loadProductwithSlug = (slug) =>{
        getProduct(slug).then(res=>{
            if(res.error){
                setError(res.error)
            }
            setProduct(res)
        }).catch(err =>{
            setError(err)
        })

    }

    useEffect(() => {
        const slug = props.match.params.productslug
        loadProductwithSlug(slug)

    },[])
    

    return(
        <Layout title="Single Product" description="Single Product">
           {JSON.stringify(product)}
           {JSON.stringify(error)}

        </Layout>
    )
}
export default Product