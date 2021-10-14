/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import addressSchema from './Address'

export type OrderDocument = Document & {
  orderNumber: string
  orderDate: Date
  shipDate: Date
  orderSummary: number
  address: string[]
  shoes: string[]
}

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
  },
  shipDate: {
    type: Date,
  },
  orderSummary: {
    type: Number,
  },
  address: [addressSchema],
  shoes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shoes',
    },
  ],
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
