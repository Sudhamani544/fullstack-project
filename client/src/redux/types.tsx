export type Product = {
  _id: string
  title: string
  description: string
  countInStock: number
  price: number
  category: string
  shoeCategory: string
  discount: boolean
  imageUrl: [string]
}

export type Cart = {
  _id: string
  title: string
  description: string
  countInStock: number
  price: number
  category: string
  discount: boolean
  imageUrl: [string]
  size: number
  qty: number
}

export type Fav = {
  _id: string
  title: string
  imageUrl: [string]
  price: number
}

export type Size = {
  size: number
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  emailId: string
  shoes: []
}
