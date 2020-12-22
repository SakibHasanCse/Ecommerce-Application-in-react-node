import express from 'express';
import { userSignupValidator } from '../validator';
import { createUser, loginUser, Signout } from './../controller/user';

const router = express.Router()

router.post('/signup', userSignupValidator, createUser)
router.post('/signin', loginUser)
router.get('/signout', Signout)
export default router