import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserDocument } from '../models/User'
import User from '../models/User'
import { NotFoundError } from '../helpers/apiError'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err, payload: any) => {
        if (err) res.status(403).json('Token is not valid!')
        const user = await User.findOne({
          emailId: payload.userData.emailId,
        }).exec()
        if (!user) {
          throw new NotFoundError('user not found')
        }
        req.user = user as UserDocument
        next()
      }
    )
  } else {
    return res.status(401).json('You are not authenticated!')
  }
}

export const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    const user = req.user as UserDocument
    if (user._id === req.params.id || user.isAdmin) {
      next()
    } else {
      res.status(403).json('You are not alowed to do that!')
    }
  })
}

export const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    const user = req.user as UserDocument
    if (user.isAdmin) {
      next()
    } else {
      res.status(403).json('You do not have admin permission!')
    }
  })
}
