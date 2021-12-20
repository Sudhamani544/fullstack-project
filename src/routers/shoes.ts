import express from 'express'
import passport from 'passport'
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verifyToken'

import {
  createShoes,
  findById,
  deleteShoes,
  findAll,
  updateShoes,
} from '../controllers/shoes'

const router = express.Router()

// Every path we define here will get /api/v1/shoes prefix
router.get('/', findAll)
router.get('/:shoeId', findById)
router.put('/:shoeId', verifyTokenAndAdmin, updateShoes)
router.delete('/:shoeId', verifyTokenAndAdmin, deleteShoes)
router.post('/', verifyTokenAndAdmin, createShoes)

export default router
