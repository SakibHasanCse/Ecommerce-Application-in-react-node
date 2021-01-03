
import { API } from './../config';


export const GetProducts = (sortBy) => {

    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
        return err

    })

}



export const getProductsByFilter = (skip,limit ,filters={}) => {
    const data ={
        skip ,limit,filters
    }
    console.log(data)
    return fetch(`${API}/product/search`, {
        method: 'POST', headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).catch(err => {
            console.log(err)
            return err

        })

}