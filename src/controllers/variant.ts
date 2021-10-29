import { Request, Response, NextFunction } from 'express'

import Variant from '../models/Variant'
import VariantService from '../services/variant'
import { BadRequestError } from '../helpers/apiError'

// POST /variant
export const createSize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { size } = req.body
    const variant = new Variant({
      size,
      product: [],
    })

    await VariantService.create(variant)
    res.json(variant)
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
    res.json(await VariantService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
