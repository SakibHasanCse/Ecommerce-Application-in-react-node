import express from 'express';
import { userSignupValidator } from '../validator';
import { createCategory } from '../controller/category';
import { isAuth, isAdmin, userById } from '../controller/user';
import { validateTokenJWT } from '../controller/auth';


const router = express.Router()


router.post('/category/create/:userId', validateTokenJWT, isAuth ,isAdmin ,createCategory)

router.param('userId', userById)
export default router