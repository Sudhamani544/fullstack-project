import GoogleTokenStrategy from 'passport-google-id-token'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user'
import User from '../models/User'
import { JWT_SECRET } from '../util/secrets'
import { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
// const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    // eslint-disable-next-line
    const { email, name, picture, given_name, family_name } =
      parsedToken.payload
    // eslint-disable-next-line
    const user = await UserService.findOrCreate(email, given_name, family_name)
    //2 arguments, first one is the error object, second is the data you want to forward
    done(null, user)
  }
)

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //token = req.headers.authorization.split(" ")[1]
  },
  //here payload is the token payload(userData in login.ts)
  async (payload: any, done: any) => {
    console.log('payload', payload)

    const { emailId } = payload.userData
    console.log('emailid', emailId)
    const user = await User.findOne({ emailId: emailId })

    if (!user) {
      throw new NotFoundError('user not found')
    }

    done(null, user)
  }
)

//to use jwt passport strategy, for auth use "passport.authenticate('jwt', { session: false })"
