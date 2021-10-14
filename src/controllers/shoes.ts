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
    const shoesData = req.body
    const shoes = new Shoes({
      brandName: shoesData.brandName,
      category: shoesData.category,
      gender: shoesData.gender,
      price: shoesData.price,
      discount: shoesData.price,
      shoesQuantity: shoesData.shoesQuantity,
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

// PUT /shoes/:shoesId
export const updatedShoes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const shoesId = req.params.shoesId
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

// DELETE /shoes/:shoesId
export const deleteShoes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ShoesService.deleteShoes(req.params.shoesId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /shoes/:shoesId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ShoesService.findById(req.params.shoesId))
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
