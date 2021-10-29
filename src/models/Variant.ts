/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type VariantDocument = Document & {
  size: number
}

const variantSchema = new mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shoes',
    },
  ],
})

export default mongoose.model<VariantDocument>('Variant', variantSchema)
