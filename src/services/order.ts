import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'
import { UserDocument } from '../models/User'

const create = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const findById = async (userId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(userId)

  if (!foundOrder) {
    throw new NotFoundError(`shoe with userId ${userId} not found`)
  }

  return foundOrder
}

const findAll = async (): Promise<OrderDocument[]> => {
  return Order.find()
}

const update = async (
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  const foundOrder = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  })

  if (!foundOrder) {
    throw new NotFoundError(`Movie ${orderId} not found`)
  }

  return foundOrder
}

const deleteOrder = async (orderId: string): Promise<OrderDocument | null> => {
  const foundOrder = Order.findByIdAndDelete(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Movie ${orderId} not found`)
  }

  return foundOrder
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteOrder,
}
