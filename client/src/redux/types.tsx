export type Product = {
  _id: string
  title: string
  description: string
  countInStock: number
  price: number
  discount: boolean
  imageUrl: string
}

export type Cart = {
  id: string
  title: string
  description: string
  countInStock: number
  price: number
  discount: boolean
  imageUrl: string
  qty: number
}

export type Fav = {
  id: string
  title: string
  imageUrl: string
  price: number
}
