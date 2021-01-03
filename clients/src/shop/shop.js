import React, { useEffect, useState } from 'react';
import { AllCategoryAPi } from './../admin/adminApi';
import Checkbox from './categoryCheckBox';
import Layout from './layout';
import RadioBox from './RadioBox';
import { Prices } from './fixedprice';
import { getProductsByFilter } from './shopApi';
import { Link } from 'react-router-dom';
import { ProductCard } from './card';


export const ShopProduct = () => {
    const [myFiltes, setMyfilters] = useState({ filters: { category: [], price: [] } })
    const [categories, setCategory] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filterResult, setFilterResult] = useState(0)

    const init = () => {
        AllCategoryAPi()
            .then(result => {
                if (result.error) {
                    console.log(result.error)

                    setError(result.error)
                }
                setCategory(result.data)
            }).catch(err => {
                console.log(err)
                setError(err)

            })
    }


    const loadProductByFilter = (newfilter) => {

        getProductsByFilter(skip, limit, newfilter)
            .then(result => {
                console.log(result)
                if (result.error) {
                    setError(result.error)

                } else {
                    setFilterResult(result.data)

                }
            }).catch(err => {
                setError(err)

            })

    }






    const handlefilters = (filters, filterBy) => {
        const newFilters = { ...myFiltes }
        newFilters.filters[filterBy] = filters

        if (filterBy === 'price') {
            let pricevalue = handlePrice(filters)
            newFilters.filters[filterBy] = pricevalue

        }
        loadProductByFilter(myFiltes.filters)
        setMyfilters(newFilters)
    }




    const handlePrice = (value) => {
        const data = Prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }

        }
        return array


    }

    useEffect(() => {
        init()
        loadProductByFilter(skip, limit, myFiltes.filters)
    }, [])



    return (
        <Layout title="Shop Product" description="Shop Product" className="container">
            <div className="row">
                <div className="col-4">
                    <h4 class="font-weight-bold mb-2">Filter Buy Category</h4>
                    <ul>

                        <Checkbox categories={categories} handlefilters={(filters) => handlefilters(filters, 'category')} />
                    </ul>

                    <h4 class="font-weight-bold mb-2">Filter Buy Price</h4>
                    <div>
                        <RadioBox prices={Prices} handlefilters={(filters) => handlefilters(filters, 'price')} />
                    </div>

                </div>

                <div className="col-8">
                    <h5 class="font-weight-bold mb-2">Products</h5>

                    <div className="row pb-5 mb-4">
                        {filterResult.map((product, i) => (


                            <ProductCard key={i} product={product} />

                        )
                        )}
                    </div>


                </div>
            </div>


        </Layout>
    )
}