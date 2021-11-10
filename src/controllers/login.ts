import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserDocument } from '../models/User'

import { JWT_SECRET } from './../util/secrets'

// get /api/v1/google/login
export const googleLogin = (req: Request, res: Response) => {
  const userData = req.user as UserDocument
  const token = jwt.sign({ userData }, JWT_SECRET, {
    expiresIn: '2h',
  })
  res.json({ token: token, userData: userData })
}
