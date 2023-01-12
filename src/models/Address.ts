/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type AddressDocument = Document & {
  phoneNumber: number
  houseNumber: string
  streetName: string
  city: string
  pinCode: string
}

const addressSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
  },
  houseNumber: {
    type: String,
  },
  streetName: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  pinCode: {
    type: String,
  },
})

export default addressSchema
