import express from 'express';
import { validateTokenJWT } from '../controller/auth';
import { isAuth, userById } from '../controller/user';




const router = express.Router()

router.get('/secret/:userId', validateTokenJWT, isAuth, (req, res) => {
    res.json({ user: req.profile })
})

router.param('userId', userById)
export default router