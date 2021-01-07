import React, { useEffect, useState } from 'react';
import { ProductCard } from './card';
import Layout from "./layout";
import Search from "./Search";
import { GetProducts } from './shopApi';

const Home = () => {
    const [productBySell, setProductBySell] = useState([])
    const [productByArival, setProductByArival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        GetProducts('sold').then(result => {
            if (result.error) {
                setError(result.error)
            } else {
                setProductBySell(result)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const loadProductsByArrival = () => {
        GetProducts('createdAt').then(result => {
            if (result.error) {
                setError(result.error)
            } else {
                setProductByArival(result)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadProductsBySell()
        loadProductsByArrival()
    }, [])
    return (
        <Layout title="Home Page" description="This is the home page" className="container py-5">

            <Search />
            <h2 class="font-weight-bold mb-2">New Arrival</h2>
            <div className="row pb-5 mb-4">
                {productByArival.map((product, i) => (
                    < ProductCard key={i} product={product} />
                )
                )}
            </div>


            <h2 class="font-weight-bold mb-2">Best Sellers</h2>
            <div className="row pb-5 mb-4">
                {productBySell.map((product, i) => (
                    < ProductCard key={i} product={product} />
                )
                )}
            </div>

        </Layout>
    );
}

export default Home;
