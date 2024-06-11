import {Router} from 'express'
import {verifyToken} from '../middlewares/userVerification.js'
import { updateUser } from '../controllers/user.controller.js'

const router = Router()

router.put('/', verifyToken, updateUser)

export default router