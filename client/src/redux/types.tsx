export type Product = {
  _id: string
  title: string
  description: string
  countInStock: number
  price: number
  category: string
  shoeCategory: string
  discount: boolean
  imageUrl: string
}

export type Cart = {
  id: string
  title: string
  description: string
  countInStock: number
  price: number
  category: string
  discount: boolean
  imageUrl: string
  size: number
}

export type Fav = {
  id: string
  title: string
  imageUrl: string
  price: number
}

export type Size = {
  size: number
}
