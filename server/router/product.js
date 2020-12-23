import express from 'express';
import { userSignupValidator } from '../validator';

import { isAuth, isAdmin, userById } from '../controller/user';
import { validateTokenJWT } from '../controller/auth';
import { createProduct, productById } from './../controller/product';


const router = express.Router()


router.post('/product/create/:userId', validateTokenJWT, isAuth, isAdmin, createProduct)
router.get('/product/:prodId', singleProduct)

router.param('userId', userById)
router.param('prodId', productById)

export default router