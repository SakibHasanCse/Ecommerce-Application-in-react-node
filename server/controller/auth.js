import User from '../model/auth';
import {errorHandler} from '../helpers/dbErrorHandler'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

export const loginUser =  async (req, res) =>{
    try {
        const {email , password} = req.body
         await User.findOne({email},(err, user)=>{
             if(err, !user){
                 return res.status(400).json({

                     error:'User Not Found'
                })
                
             }

             if (!user.authenticate(password)){
                 return res.status(400).json({

                     error: 'Email and password not Match'
                 })

             }


             const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN)
             res.cookie("t" ,token ,{expire:new Date() + 9999})
             const {_id ,name ,email ,role} = user
            
             return res.status(200).json({
                 success: true,
                 token,
                user:{ _id, name, email, role}
             })

         });

      return  res.status(200).json({
            user
        })
    } catch (error) {
        
    }
}
export const createUser = async (req, res) => {
    try {
        const body =req.body
        const users = await User.findOne({ email: body.email});
        if (users) {
            return  res.status(404).json({
                success:false, message:'User already exists with this email address'
            })
        }
        const newUser = new User(req.body)
        await newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    err:errorHandler(err)
                })
            }
            user.salt = undefined
            user.hashed_password =  undefined
            return res.status(200).json({
                user
            })
        })
    } catch (error) {
        return res.status(400).json({
            success: false, message: error.message
        })
    }
}

export const Signout =  async (req, res) => {
    res.clearCookie("t")
    return res.json({
        success:true,
        message:'Signout successfully  '
    })
}

export const validateTokenJWT = expressJwt({
    secret: process.env.JWT_TOKEN || 'asedfawerwerwerfd',
    userProperty: "auth",  algorithms: ['HS256']
})