import { Dispatch } from 'redux'
import { Cart, Product } from '../types'
import * as actionTypes from '../constants/cartConstants'

export const insertToCart = (product: Product, qty: number) => {
  return {
    type: actionTypes.INSERT_TO_CART,
    payload: {
      id: product._id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    },
  }
}

export const removeFromCart = (productName: string) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: productName,
  }
}

export const fetchError = (error: any) => {
  return {
    type: actionTypes.FETCH_ERROR,
    payload: error,
  }
}

//literaltype
type FetchError = {
  type: typeof actionTypes.FETCH_ERROR
  payload: any
}

type InsertToCart = {
  type: typeof actionTypes.INSERT_TO_CART
  payload: Cart
}

type RemoveFromCart = {
  type: typeof actionTypes.REMOVE_FROM_CART
  payload: string
}

export type AllActions = FetchError | InsertToCart | RemoveFromCart
