import express from 'express'
import passport from 'passport'
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/user prefix
router.get('/', verifyTokenAndAdmin, findAll)
router.get('/:userId', verifyTokenAndAdmin, findById)
router.put('/:userId', verifyTokenAndAuthorization, updateUser)
router.delete('/:userId', verifyTokenAndAuthorization, deleteUser)
router.post('/', createUser)

export default router
