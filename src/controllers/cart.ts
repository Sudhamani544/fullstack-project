import { Request, Response, NextFunction } from 'express'

import Cart from '../models/Cart'
import CartService from '../services/cart'
import { BadRequestError } from '../helpers/apiError'

// POST /
export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, products } = req.body
    console.log('incart', req.body)
    const cart = new Cart({
      userId,
      products,
    })

    await CartService.create(cart)
    res.json(cart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /:userId
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const updatedCart = await CartService.update(userId, req.body)
    res.json(updatedCart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /shoes/:shoeId
export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CartService.deleteCart(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CartService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CartService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
