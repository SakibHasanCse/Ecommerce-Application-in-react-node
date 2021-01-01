import React from 'react';
import { API } from './../config';
export const CardImage = ({item , url})=>{
    return(
    
             <img  src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="w-100 card-img-top" />
       
    )
}