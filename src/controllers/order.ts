import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import OrderService from '../services/order'
import { BadRequestError } from '../helpers/apiError'

// POST /order
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, products, amount, address, status } = req.body
    const order = new Order({
      userId,
      products,
      amount,
      address,
      status,
    })

    await OrderService.create(order)
    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /order/:orderId
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.shoeId
    const updatedOrder = await OrderService.update(productId, update)
    res.json(updatedOrder)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /order/:orderId
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await OrderService.deleteOrder(req.params.shoeId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /order/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await OrderService.findById(req.params.orderId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /order
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await OrderService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
