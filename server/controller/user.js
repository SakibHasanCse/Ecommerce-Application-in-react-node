import User from '../model/auth';

export const userById = async (req, res ,next ,id) => {
    try {
        await User.findById(id,(err,user)=>{
            if(err || !user){
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