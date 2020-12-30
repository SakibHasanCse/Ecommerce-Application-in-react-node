import { errorHandler } from '../helpers/dbErrorHandler'
import Category from '../model/category'
export const createCategory = async(req , res , next)=>{

  try {
      const cat = await Category.findOne(req.body)
      if(cat){
         return res.status(401).json({
                  error: 'Category Already exists'
              }) 
      }
      const category = new Category(req.body)

      await category.save((err, cat) => {
          if (err) {
              console.log(err)
              return res.status(400).json({
                  error: errorHandler(err)
              })
          }
              console.log(cat)

          return res.status(201).json({
              success: true,
              data: cat
          })
      })
  } catch (error) {
      return res.status(500).json({
          error: 'Internal Server Error'
      })
  }
}

export const updateCategory = async (req, res, next) => {

    try {
        const category = req.category
        category.name =req.body.name
        await category.save((err, cat) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            return res.status(201).json({
                message:"Category Update Sucessfully"
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}
export const deleteCategory = async (req, res, next) => {

    try {
        const category = req.category

        category.remove((err, cat) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            return res.status(201).json({
                message:'Category deleted successfully'
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}
export const listCategory = async (req, res, next) => {

    try {
       
        await Category.find()
            .exec((err, cat) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            return res.status(201).json({
                success: true,
                data: cat
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const singleCategory = async (req, res, next) => {

    try {
            return res.status(201).json(
                req.category
            )
      
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const findByCatId = async (req, res  ,next ,id)=> {
    await Category.findById(id).exec((err,cat)=>{
        if (err || !cat) {
            return res.status(400).json({
                error:'Category Not Found'
            })
        }
        req.category = cat
        next()
    })
}