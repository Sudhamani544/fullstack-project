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
    const {
      title,
      description,
      shoeCategory,
      category,
      size,
      price,
      discount,
      countInStock,
      imageUrl,
    } = req.body
    const shoes = new Shoes({
      title,
      description,
      shoeCategory,
      category,
      size,
      price,
      discount,
      countInStock,
      imageUrl,
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
    const productId = req.params.shoeId
    const updatedShoes = await ShoesService.update(productId, update)
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
    const query = req.query.category as string
    if (query === undefined) {
      res.json(await ShoesService.findAll())
    } else {
      res.json(await ShoesService.findByCategory(query))
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
