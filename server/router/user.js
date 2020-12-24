import express from 'express';
import { validateTokenJWT } from '../controller/auth';
import { isAuth, userById, updateUser ,profile} from '../controller/user';




const router = express.Router()

router.get('/secret/:userId', validateTokenJWT, isAuth, (req, res) => {
    res.json({ user: req.profile })
})
router.get('/user/:userId', isAuth , profile)
router.put('/user/update/:userId', isAuth ,updateUser)

router.param('userId', userById)
export default router