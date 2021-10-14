/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ShoesDocument = Document & {
  category: string
  brandName: string
  gender: string
  price: number
  discount: boolean
  image: string
  User: string[]
  Order: string[]
  variant: string[]
}

const shoesSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Boolean,
    required: true,
  },
  shoesQuantity: {
    type: Number,
  },
  image: {
    type: String,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  variant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Variant',
    },
  ],
})

export default mongoose.model<ShoesDocument>('Shoes', shoesSchema)
