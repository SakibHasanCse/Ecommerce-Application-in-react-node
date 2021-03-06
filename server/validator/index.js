 exports.userSignupValidator =(req,res ,next) => {
     console.log('hello')
     req.check('email', 'Email is required')
            .isEmail()
            .matches(/.+\@.+\..+/)
            .withMessage('Email must content @')
            .isLength({ min:2 ,max:32})
     req.check('name', 'name is required')
         .isLength({ min: 2  })
         .withMessage("Name must be at least 2 characters")
     req.check('password', 'password is required')
         .isLength({ min: 6 ,max:100})
         .withMessage("Password must contain at last 6 characters")
         

        const error = req.validationErrors();
        if(error){
            console.log(error);
            const firstError = error.map(error => error.msg)[0]
            return res.status(400).json({
                error:firstError
            })

        }
        next()
 }