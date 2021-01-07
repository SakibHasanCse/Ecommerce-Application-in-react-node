import React, { useState } from 'react';

 const Checkbox = ({categories , handlefilters})=>{


    const [checked ,setChecked] = useState([])
    const  handelCheck = c=> ()=>{
        console.log(c)
        // return the first  index or -1
        const currentCategoryId = checked.indexOf(c)
        const  newCheckedCategoryId = [...checked]

        // if currently  checked was not already in checked state  > push
        // else pull/take off

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId , 1)
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handlefilters(newCheckedCategoryId)

    }  
    
    return  categories.map((category ,i) =>(
        <li key={i} className="list-unstyled">
                <input onChange={handelCheck(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox"  className="form-check-input" />
                <label className="form-check-label" >{category.name}</label>
         </li>
         )
        )
}

export default Checkbox