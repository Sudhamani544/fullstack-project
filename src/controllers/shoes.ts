import { Request, Response, NextFunction } from 'express'

import Shoes from '../models/Shoes'
import ShoesService from '../services/shoes'
import { BadRequestError } from '../helpers/apiError'

// POST /shoes
export const createShoes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, price, discount, imageUrl, countInStock } =
      req.body
    const shoes = new Shoes({
      title,
      description,
      price,
      discount,
      imageUrl,
      countInStock,
      user: [],
      order: [],
      variant: [],
    })

    await ShoesService.create(shoes)
    res.json(shoes)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /shoes/:shoeId
export const updateShoes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const shoesId = req.params.shoeId
    const updatedShoes = await ShoesService.update(shoesId, update)
    res.json(updatedShoes)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /shoes/:shoeId
export const deleteShoes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ShoesService.deleteShoes(req.params.shoeId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /shoes/:shoeId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ShoesService.findById(req.params.shoeId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /shoes
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ShoesService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
