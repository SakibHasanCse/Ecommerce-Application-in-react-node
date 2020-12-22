import User from '../model/user';

export const loginUser =  async (req, res) =>{
    try {
        const user = await User.find();
      return  res.status(200).json({
            user
        })
    } catch (error) {
        
    }
}
export const createUser = async (req, res) => {
    try {
        const body =req.body
        const users = await User.find({ email: body.email});
        if (users) {
            return  res.status(404).json({
                success:false, message:'User already exists with this email address'
            })
        }
        const newUser = new User(req.body)
        await newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false, message: 'Somthing went wrong'
                })
            }
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