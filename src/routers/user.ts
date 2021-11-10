import express from 'express'
import passport from 'passport'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/user prefix
router.get('/', findAll)
router.get('/:userId', findById)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
)
router.delete('/:userId', deleteUser)
router.post('/', createUser)

export default router
