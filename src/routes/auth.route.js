import express from 'express'
import {
  infoUser,
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/auth.controller.js'
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js'
import {
  loginValidator,
  registerValidator,
  tokenCookieValidator,
  tokenHeaderValidator,
} from '../middlewares/validatorManager.js'
import { requireToken } from '../middlewares/requireToken.js'

const router = express.Router()

router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)
router.get('/protected', tokenHeaderValidator, requireToken, infoUser)
router.get('/refresh', tokenCookieValidator, requireRefreshToken, refreshToken)
router.get('/logout', logout)

export default router
