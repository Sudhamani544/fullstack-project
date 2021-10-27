/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ShoesDocument = Document & {
  title: string
  decription: string
  countInStock: number
  price: number
  discount: boolean
  imageUrl: string
  User: string[]
  Order: string[]
  variant: string[]
}

const shoesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  // brandName: {
  //   type: String,
  //   required: true,
  // },
  // category: {
  //   type: String,
  //   required: true,
  // },
  // gender: {
  //   type: String,
  // },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Boolean,
  },
  countInStock: {
    type: Number,
  },
  imageUrl: {
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
