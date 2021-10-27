import { Dispatch } from 'redux'
import { Product } from '../types'
import * as actionTypes from '../constants/productConstants'
import axios from 'axios'

//redux-thunk to fetch data using async, this thunk is called in CountryTableContainer
export const getProducts = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const item = await axios('http://localhost:5000/api/v1/shoes')
      const productsList = item.data as Product[]
      dispatch(fetchProductsList(productsList))
    } catch (error) {
      dispatch(fetchError(error))
    }
  }
}

//delivering thunk to the reducer
export const fetchProductsList = (data: Product[]) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_LIST,
    payload: data,
  }
}

export const getOneProduct = (id: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const item = await axios(`http://localhost:5000/api/v1/shoes/${id}`)
      const product = item.data as Product
      console.log('hey', product)
      dispatch(fetchOneProduct(product))
    } catch (error) {
      dispatch(fetchError(error))
    }
  }
}

export const fetchOneProduct = (data: Product) => {
  return {
    type: actionTypes.FETCH_ONE_PRODUCT,
    payload: data,
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

type FetchProductsList = {
  type: typeof actionTypes.FETCH_PRODUCTS_LIST
  payload: Product[]
}

type FetchOneProduct = {
  type: typeof actionTypes.FETCH_ONE_PRODUCT
  payload: Product
}

export type AllActions = FetchError | FetchProductsList | FetchOneProduct
