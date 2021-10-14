import express from 'express'

import {
  createShoes,
  findById,
  deleteShoes,
  findAll,
  updateShoes,
} from '../controllers/shoes'

const router = express.Router()

// Every path we define here will get /api/v1/user prefix
router.get('/', findAll)
router.get('/:userId', findById)
router.put('/:userId', updateShoes)
router.delete('/:userId', deleteShoes)
router.post('/', createShoes)

export default router
