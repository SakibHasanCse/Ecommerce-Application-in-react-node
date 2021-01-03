
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'
import { errorHandler } from '../helpers/dbErrorHandler'
import Product from '../model/product'
export const createProduct = async (req, res) => {

    const form = formidable.IncomingForm()
    form.keepExtantion = true

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image couldn not be Uploaded'
            })
        }

        // 1kb = 1000
        //1mb = 1000000



        const product = new Product(fields)
        if (files.photo) {
            console.log(files.photo)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                })

            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)

                })
            }
            return res.status(201).json(result )
        })

    })
}


export const productById = async (req, res, next, id) => {
    try {

        await Product.findById(id, (err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
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
    try {

        return res.status(200).json({ product: req.product })
    } catch (error) {
        return res.status(404).json({
            error: 'Somting went Worng'
        })
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const product = req.product
        product.remove((err, results) => {
            if (err) {
                return res.status(400).json({
                    error: 'Product not deleted'
                })
            }
            return res.status(200).json({
                error: 'Product delete successfully '
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Somting went Worng'
        })
    }
}
export const updateProduct = async (req, res) => {

    const form = formidable.IncomingForm()
    form.keepExtantion = true

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image couldn not be Uploaded'
            })
        }

        // 1kb = 1000
        //1mb = 1000000



        let product = req.product
        product = _.extend(product, fields)


        if (files.photo) {
            console.log(files.photo)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                })

            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err || !result) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)

                })
            }
            return res.status(201).json({ result })
        })

    })
}

export const getProduct = async (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    await Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, product) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: 'Product not found'
                })
            }
            return res.json(product)
        })
}

export const relatedProduct = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6


    await Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, result) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: 'Product not found'
                })
            }
            return res.json(result)

        })
}

export const listCategory = async (req, res) => {
    try {
        await Product.distinct("category", {},
            (err, categorys) => {
                console.log("categorys" )
                console.log(err)
                if (err) {
                    return res.status(400).json({
                        error: 'category not found'
                    })
                }
                res.json(categorys)
            })
    } catch (error) {
        return res.status(400).json({
            error: 'Somthing went Worng'
        })
    }

}

export const listBySearch =async (req, res) => {
    let order= req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip)

    let  findArray = {}
    
    for(let key in req.body.filters) {
            if(req.body.filters[key].length > 0){
                if(key === "price"){
                    findArray[key] = {
                        $gte:req.body.filters[key][0],
                        $lte:req.body.filters[key][1]
                    }
                }
                
            }else{
                findArray[key] = req.body.filters[key]
            }
        }
        console.log(findArray ,limit , skip )

  await  Product.find(findArray)
        .select("-photo")
        .populate("category")
        .sort([[sortBy , order]])
        .skip(skip)
        .limit(limit)
        .exec((err,data)=>{
            console.log(data)
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: 'Product not found'
                })
            }
            return res.json({ 
                
                size:data.length,
                data
            }
            )
        })
}

export const photo =(req , res , next)=>{
    if(req.product.photo.data){
    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
    }
    next()
}