import mongoose from 'mongoose';

export const dbconnect = (url)=>{

    mongoose.connect(url ,{useCreateIndex:true}).then(res => {
        console.log('database connection established')
        
    }).catch(err => {
        console.log(err.message)
})


}