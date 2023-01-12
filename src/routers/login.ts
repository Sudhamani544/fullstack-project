import express from 'express'
import passport from 'passport'

import { googleLogin } from '../controllers/login'
const router = express.Router()

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)

export default router
