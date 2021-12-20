/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import addressSchema from './Address'

export type OrderDocument = Document & {
  userId: string
  products: [{ productId: string; quantity: number }]
  amount: number
  address: object
  status: string
}

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, requried: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
)

// const orderSchema = new mongoose.Schema({
//   orderNumber: {
//     type: String,
//     required: true,
//   },
//   orderDate: {
//     type: Date,
//   },
//   shipDate: {
//     type: Date,
//   },
//   orderSummary: {
//     type: Number,
//   },
//   address: [addressSchema],
//   shoes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Shoes',
//     },
//   ],
// })

export default mongoose.model<OrderDocument>('Order', orderSchema)
