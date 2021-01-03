import React, { Fragment, useEffect, useState } from 'react';
import { AllCategoryAPi } from './../admin/adminApi';

import { ProductCard } from './card';
import { listBySearch } from './shopApi';


const Search = () => {
    const [data, setData] = useState({
        categories: [], category: '', search: '', results: [], searched: false

    })
    const [error, setError] = useState(false)
    const { categories, category, search, results, searched } = data

    const loadCategory = () => {
        AllCategoryAPi().then(result => {
            if (result.error) {
                console.log(result.error)
                setError(result.error)
            } else {
                setData({ ...data, categories: result })
            }
        })
    }
    useEffect(() => {
        loadCategory()
    }, [])

    const viewCategorys = () => (
        categories.data && categories.data.map((category, i) => (

            <option key={i}  value={category._id}>{category.name}</option>

        ))
    )
    const handleChange = name=>e => {
   
        setData({ ...data, [name]:e.target.value ,searched:false })
    }
   const searchData = () =>{
       if(search){

           listBySearch({search:search || undefined ,category:category}).then(result=>{
               if(result.error){
                setError(result.error)


               }else{
                   setData({...data , results:result , searched:true})

               }
           })
       }
   }
    const submitSearch = (e) => {
        e.preventDefault()
        searchData()

    }

    const searchForm = () => (
        <form onSubmit={submitSearch} className="mb-4">
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select onChange={handleChange('category')} className="btn mr-2">
                            <option value="All">Select Category</option>
                            {viewCategorys()}
                        </select>
                    </div>


                    <input type="text" onChange={handleChange("search")} className="form-control" placeholder="Search By Name .." />
                </div>
                <div className="btn input-group-append" style={{border : 'none' , cursor:'pointer'}}>
                        <button className="input-group-text">Search</button>
                </div>
            </span>


        </form>
    )

const searchMessage = (searched ,results) =>{
    if(searched && results.length > 0){
        return `Found ${results.length} products`
    }
    if(searched && results.length < 1){
        return `No Products Found`
    }
}
const viewProduct = (results=[])=>{

    return (
        <Fragment>
            <h4 className=" text-center mb-3 mt-3">
                {searchMessage(searched ,results)}

            </h4>
            <br/>
            <div className="row pb-5 pt-4 mb-4">
        {results && results.map((product, i)=>(
            <ProductCard key={i} product={product} />
            ))}
            </div>
            </Fragment>
            )
    }
    


    return (
        <div  >
            {searchForm()}

            

              {viewProduct(results)}
          

        </div>
    )
}


export default Search