import User from '../model/auth';


export const profile =(req , res , next)=>{
    req.profile.hashed_password =undefined
    req.profile.salt =undefined
    return res.status(200).json(
        req.profile
    )
}


export const updateUser = (req, res, next) => {
    User.findOneAndUpdate({_id: req.profile._id} ,{$set:req.body} ,{new:true} ,(err , user)=>{
        if (err) {
            return res.status(400).json({
                error:'You are Not Authorized '
            })
            
        }
        user.hashed_password = undefined
        user.salt = undefined
        return res.status(201).json({
            message: 'Profile Updated'
        })
    })
}
export const userById = async (req, res ,next ,id) => {
    try {
        await User.findById(id,(err,user)=>{
            if(err || !user){
                console.log(err)
                return res.status(404).json({
                    error: 'User not found'
                })
            }
            req.profile =user;
            next();
        })
   

        
    } catch (error) {
        return res.status(404).json({
            error: 'Somting went Worng'
        })
    }
}

export const isAuth = (req, res , next) => {

let user = req.profile && req.auth && req.profile._id == req.auth._id;
if(!user){

    return res.status(403).json({error: 'Access Denied'})
} 
    next()
}

export const isAdmin = (req ,res , next) =>{
    if(req.profile.role == 'user'){
        return res.status(403).json({error: 'Admin resource , Access Denied'})
    }
    next()
}