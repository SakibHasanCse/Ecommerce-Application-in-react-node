
import { API } from './../config';
export const signup = (user) => {
    
    return fetch(`${API}/signup`,
        {
            method: 'POST',
            headers: {
                Accept:
                    'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => {

            return res.json()
        }).catch(err => {
            console.log(err)
        })

}

export const signin = (user) => {

    return fetch(`${API}/signin`,
        {
            method: 'POST',
            headers: {
                Accept:
                    'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => {

            return res.json()
        }).catch(err => {
            console.log(err)
        })

}

export const authonticate = (data ,next) => { 
    if(typeof window !== 'undefined'){
        window.localStorage.setItem('jwt' , JSON.stringify(data))
        next()
    }
}
export const logoutauthorized = (next) => {
    if(typeof window !== 'undefined'){
        window.localStorage.removeItem('jwt')
        next();
         return fetch(`${API}/signout` ,{method:'GET'}).then(response=>{
            console.log(response)
        }).catch(err => {
            console.log(err)
            
        })
    }

}

export const isAuthnticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}