/* eslint-disable @typescript-eslint/member-delimiter-style */
import { kMaxLength } from 'buffer'
import mongoose, { Document } from 'mongoose'

export type ShoesDocument = Document & {
  title: string
  decription: string
  countInStock: number
  price: number
  category: string
  discount: boolean
  imageUrl: string
  User: string[]
  Order: string[]
  variant: string[]
  shoeCategory: string
}

const shoesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    shoeCategory: {
      type: String,
    },
    category: {
      type: String,
      required: [true, 'Please enter product category'],
    },
    size: [{ type: Number, required: true }],
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      maxLength: [3, 'Price cannot exceed 3 digits'],
    },
    discount: {
      type: Boolean,
    },
    countInStock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      default: 1,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<ShoesDocument>('Shoes', shoesSchema)
