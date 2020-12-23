import { errorHandler } from '../helpers/dbErrorHandler'
import Category from '../model/category'
export const createCategory = async(req , res , next)=>{

  try {
      const category = new Category(req.body)
      await category.save((err, cat) => {
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
