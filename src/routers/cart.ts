import express from 'express'
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} from '../middlewares/verifyToken'

import {
  createCart,
  updateCart,
  deleteCart,
  findById,
  findAll,
} from '../controllers/cart'

const router = express.Router()

// Every path we define here will get /api/v1/cart prefix

router.post('/', verifyToken, createCart)
router.put('/', verifyTokenAndAuthorization, updateCart)
router.delete('/', verifyTokenAndAuthorization, deleteCart)
router.get('/:userId', verifyTokenAndAuthorization, findById)
router.get('/', verifyTokenAndAdmin, findAll)

export default router
