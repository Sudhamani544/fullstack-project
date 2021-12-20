import express from 'express'
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} from '../middlewares/verifyToken'

import {
  createOrder,
  updateOrder,
  deleteOrder,
  findById,
  findAll,
} from '../controllers/order'

const router = express.Router()

// Every path we define here will get /api/v1/order prefix

router.post('/', verifyToken, createOrder)
router.put('/:orderid', verifyTokenAndAdmin, updateOrder)
router.delete('/:orderid', verifyTokenAndAdmin, deleteOrder)
//get user orders
router.get('/:userId', verifyTokenAndAuthorization, findById)
router.get('/', verifyTokenAndAdmin, findAll)

export default router
