import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import passport from 'passport'
import compression from 'compression'
import cors from 'cors'

import userRouter from './routers/user'
import shoesRouter from './routers/shoes'
import cartRouter from './routers/cart'
import loginRouter from './routers/login'
import stripeRouter from './routers/stripe'
import orderRouter from './routers/order'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { googleStrategy, jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.use(cors())
app.set('port', process.env.PORT || 3000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
//initialize the passort middleware
app.use(passport.initialize())
//after passport initialization, define passport strategy
passport.use(googleStrategy)
passport.use(jwtStrategy)

// Use movie router
app.use('/api/v1/google/login', loginRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/shoes', shoesRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/payment', stripeRouter)
// Custom API error handler
app.use(apiErrorHandler)

export default app
