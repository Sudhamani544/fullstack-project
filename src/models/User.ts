/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: number
  emailId: string
  shoes: string[]
  order: string[]
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
  },
  shoes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shoes',
    },
  ],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
