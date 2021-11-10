import { Dispatch } from 'redux'
import { Cart, Product, User } from '../types'
import * as actionTypes from '../constants/cartConstants'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

export const insertToDBCart = (product: Product, user: User, token: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      await axios.put(
        `/user/${user._id}`,
        { shoes: product._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      await axios.put(
        `/shoes/${product._id}`,
        { user: user._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (error) {
      console.log('frontend')
      dispatch(fetchError(error))
    }
  }
}

export const getShoesFromDB = (userId: string | undefined) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const user = await axios(`/user/${userId}`)
      const userProducts = user.data as User
      console.log('shoes from user', userProducts.shoes)
      for (let i in userProducts.shoes) {
        try {
          const product = await axios(`/shoes/${i}`)
          const productData = product.data as Product
          dispatch(fetchShoesFromDB(productData))
        } catch (error) {
          dispatch(fetchError(error))
        }
      }
    } catch (error) {
      dispatch(fetchError(error))
    }
  }
}

export const fetchShoesFromDB = (shoes: Product) => {
  return {
    type: actionTypes.FETCH_SHOES_FROM_DB,
    payload: shoes,
  }
}

export const insertToCart = (product: Product, vSize: number, qty: number) => {
  return {
    type: actionTypes.INSERT_TO_CART,
    payload: {
      id: product._id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      countInStock: product.countInStock,
      size: vSize,
      qty: qty,
    },
  }
}

export const removeFromCart = (id: string) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
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

type FetchShoesFromDB = {
  type: typeof actionTypes.FETCH_SHOES_FROM_DB
  payload: Product
}

type RemoveFromCart = {
  type: typeof actionTypes.REMOVE_FROM_CART
  payload: string
}

export type AllActions =
  | FetchError
  | InsertToCart
  | RemoveFromCart
  | FetchShoesFromDB
