import { API } from './../config';
export const CategoryAPi = (id, token, category) => {

    return fetch(`${API}/category/create/${id}`, {
        method: 'POST', headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
        return err

    })

}

export const ProdductAPi = (id, token, product) => {
    console.log(id, token, product)

    return fetch(`${API}/product/create/${id}`, {
        method: 'POST', headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: product
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
        return err

    })

}




export const AllCategoryAPi = () => {


    return fetch(`${API}/category/list`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
        return err

    })

}

