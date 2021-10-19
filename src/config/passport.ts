import passport from 'passport'
import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import { Strategy } from 'passport-jwt'

import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user'
// const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    console.log('parsedToken: ', parsedToken)
    const { email, name, picture, given_name, family_name } =
      parsedToken.payload
    const user = await UserService.findOrCreate(email, given_name, family_name)
    console.log('promise,ts user ', user)
    //2 arguments, first one is the error object, second is the data you want to forward
    done(null, user)
  }
)
