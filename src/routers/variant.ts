import express from 'express'

import { createSize, findAll } from '../controllers/variant'

const router = express.Router()

// Every path we define here will get /api/v1/shoes prefix
router.get('/', findAll)
router.post('/', createSize)

export default router
