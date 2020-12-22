import expressJwt from 'express-jwt'
export const validateTokenJWT =  expressJwt({
    secret:process.env.JWT_TOKEN,
    userProperty:"auth"
})