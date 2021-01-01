import React, { useEffect, useState } from 'react';
import { AllCategoryAPi } from './../admin/adminApi';
import Checkbox from './categoryCheckBox';
import Layout from './layout';
import RadioBox from './RadioBox';
import { Prices } from './fixedprice';


export const ShopProduct = ()=> {
    const  [myFiltes , setMyfilters] = useState({filters:{category:[] ,price:[]} })
    const [categories ,setCategory] = useState([]);
    const [error, setError] = useState(false);

   const init = () => {
        AllCategoryAPi()
            .then(result => {
                if (result.error) {
                   setError(result.error)
                }
                setCategory( result.data)
            }).catch(err => {
                 setError(err)

            })
    }


    useEffect(() => {
        init()
    },[])


    const  handlefilters = (filters ,filterBy) => {
        const newFilters = {...myFiltes}
        newFilters.filters[filterBy] = filters

        if(filterBy === 'price'){
            let pricevalue = handlePrice(filters)
            newFilters.filters[filterBy] = pricevalue

        }
        loadProductByFilter(myFiltes.filters)
        setMyfilters(newFilters)    
    }




    const handlePrice =(value)=> {
        const data  = Prices
        let array = []

        for (let key in data) {
            if(data[key]._id ===  parseInt(value)){
                array = data[key].array                
            }

        }
        return array


    }

    const loadProductByFilter = (newfilter) =>{
        console.log(newfilter)
    }
  

          return (
             <Layout title="Shop Product" description="Shop Product" className="container">
                 <div className="row">
                     <div className="col-4">
                        <h4 class="font-weight-bold mb-2">Filter Buy Category</h4>
                         <ul>
                            
                             <Checkbox categories={categories} handlefilters ={ (filters) => handlefilters(filters ,'category')}  />
                         </ul>
                       
                        <h4 class="font-weight-bold mb-2">Filter Buy Price</h4>
                        <div>
                             <RadioBox prices={Prices} handlefilters ={ (filters) => handlefilters(filters ,'price')}  />
                        </div>
                         
                     </div>

                         <div className="col-8">
                         <h2>{JSON.stringify(myFiltes)}</h2>
                     </div>
                 </div>
                

             </Layout>
          )  
}