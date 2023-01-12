import express from 'express'
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verifyToken'

import { createPayment } from '../controllers/stripe'

const router = express.Router()

// Every path we define here will get /api/v1/payment prefix
router.post('/', createPayment)

export default router
