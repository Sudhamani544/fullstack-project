/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import colorSchema from './Color'

export type VariantDocument = Document & {
  color: string[]
  size: number
}

const variantSchema = new mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  color: [colorSchema],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shoes',
    },
  ],
})

export default mongoose.model<VariantDocument>('Variant', variantSchema)
