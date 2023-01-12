/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type CartDocument = Document & {
  userId: string
  products: [{ productId: string; quantity: number }]
}

const cartSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
)

export default mongoose.model<CartDocument>('Cart', cartSchema)
