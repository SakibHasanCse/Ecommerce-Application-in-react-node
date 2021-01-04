import express from 'express';
import { validateTokenJWT } from '../controller/auth';
import { isAdmin, isAuth, userById } from '../controller/user';
import { createProduct,getsingleProduct , deleteProduct, getProduct, listBySearch,listBySearchinHome, listCategory, photo, productById, relatedProduct, updateProduct } from './../controller/product';



const router = express.Router()



router.get('/products', getProduct)
router.get('/product/:productslug', getsingleProduct)
router.get('/product/category', listCategory)
router.get('/product/photo/:prodId', photo)
router.get('/product/related/:prodId', relatedProduct)
router.post('/product/create/:userId', validateTokenJWT, isAuth, isAdmin, createProduct)
router.delete('/product/delete/:prodId/:userId', validateTokenJWT, isAuth, isAdmin, deleteProduct)
router.put('/product/update/:prodId/:userId', validateTokenJWT, isAuth, isAdmin, updateProduct)
router.get('/product/search', listBySearchinHome)
router.post('/product/search', listBySearch)


router.param('userId', userById)
router.param('prodId', productById)

export default router