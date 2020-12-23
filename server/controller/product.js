
import Product from '../model/product'
import formidable from 'formidable'
import fs from 'fs'
import { errorHandler } from '../helpers/dbErrorHandler'
import _ from 'lodash'
export const createProduct = async (req, res)=>{

    const form = formidable.IncomingForm()
    form.keepExtantion = true

    form.parse(req, (err, fields ,files)=>{
        if(err){
            return res.status(400).json({
                error:'Image couldn not be Uploaded'
            })
        }

        // 1kb = 1000
        //1mb = 1000000



        const product = new Product(fields)
        if(files.photo){
            console.log(files.photo)
            if (files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                })

            }
            product.photo.data =fs.readFileSync(files.photo.path)
                product.photo.contentType =files.photo.type
        }
        product.save((err, result) =>{
            if(err || !result){
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)

                })
            }
            return res.status(201).json({result})
        })
    
    })
}


export const productById = async(req, res,next,id) => {
    try {
        
        await Product.findById(id ,(err, product) =>{
           if(err || !product){
               return res.status(400).json({
                   error:'Product not found'
               })
           }
           req.product = product
           next()
       })
    } catch (error) {
        return res.status(404).json({
            error: 'Somting went Worng'
        })
    }

}
export const singleProduct = (req, res) => {
    return res.status(200).json({product:req.product})

}