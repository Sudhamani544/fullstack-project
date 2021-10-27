import express from 'express'
import passport from 'passport'

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
router.put(
  '/:shoeId',
  passport.authenticate('jwt', { session: false }),
  updateShoes
)
router.delete('/:shoeId', deleteShoes)
router.post('/', createShoes)

export default router
