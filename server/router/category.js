import express from 'express';
import { validateTokenJWT } from '../controller/auth';
import { createCategory, deleteCategory, findByCatId, listCategory, singleCategory, updateCategory } from '../controller/category';
import { isAdmin, isAuth, userById } from '../controller/user';


const router = express.Router()


router.get('/category/list', listCategory)
router.get('/category/:catId', singleCategory)
router.post('/category/create/:userId', validateTokenJWT, isAuth, isAdmin, createCategory)
router.put('/category/update/:catId/:userId', validateTokenJWT, isAuth, isAdmin, updateCategory)
router.delete('/category/delete/:catId/:userId', validateTokenJWT, isAuth, isAdmin, deleteCategory)


router.param('userId', userById)
router.param('catId', findByCatId)
export default router