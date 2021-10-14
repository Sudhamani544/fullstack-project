/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ColorDocument = Document & {
  color: string
}

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
  },
})

export default colorSchema
