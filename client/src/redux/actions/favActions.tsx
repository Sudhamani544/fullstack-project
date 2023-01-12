import { Dispatch } from 'redux'
import { Cart, Product } from '../types'
import * as actionTypes from '../constants/favConstants'

export const insertToFav = (
  imageUrl: string,
  price: number,
  title: string,
  id: string
) => {
  return {
    type: actionTypes.INSERT_TO_FAV,
    payload: {
      id,
      title,
      imageUrl,
      price,
    },
  }
}

export const removeFromFav = (productId: string) => {
  return {
    type: actionTypes.REMOVE_FROM_FAV,
    payload: productId,
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

type InsertToFav = {
  type: typeof actionTypes.INSERT_TO_FAV
  payload: Cart
}

type RemoveFromFav = {
  type: typeof actionTypes.REMOVE_FROM_FAV
  payload: string
}

export type AllActions = FetchError | InsertToFav | RemoveFromFav
