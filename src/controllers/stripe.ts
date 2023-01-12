import { Request, Response, NextFunction } from 'express'

const stripeData = require('stripe')('process.env.STRIPE_SECRET_KEY_MY')
// POST /shoes
export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  stripeData.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'EUR',
    },
    (stripeErr: any, stripeRes: any) => {
      if (stripeErr) {
        res.status(500).json(stripeErr)
      } else {
        res.status(200).json(stripeRes)
      }
    }
  )
}
