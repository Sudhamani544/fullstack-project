import { NotFoundError } from '../helpers/apiError'
import Cart, { CartDocument } from '../models/Cart'

const create = async (cart: CartDocument): Promise<CartDocument> => {
  return cart.save()
}

const findAll = async (): Promise<CartDocument[]> => {
  return Cart.find()
}

const findById = async (userId: string): Promise<CartDocument> => {
  const foundCart = await Cart.findById(userId)

  if (!foundCart) {
    throw new NotFoundError(`cart for ${userId} not found`)
  }

  return foundCart
}

const update = async (
  userId: string,
  update: Partial<CartDocument>
): Promise<CartDocument | null> => {
  const foundCart = await Cart.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundCart) {
    throw new NotFoundError(`cart for ${userId} not found`)
  }

  return foundCart
}

const deleteCart = async (userId: string): Promise<CartDocument | null> => {
  const foundCart = Cart.findByIdAndDelete(userId)

  if (!foundCart) {
    throw new NotFoundError(`Cart for ${userId} not found`)
  }

  return foundCart
}

export default {
  create,
  deleteCart,
  update,
  findById,
  findAll,
}
