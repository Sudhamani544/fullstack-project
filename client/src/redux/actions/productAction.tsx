import { Dispatch } from 'redux'
import { Product, Size } from '../types'
import * as actionTypes from '../constants/productConstants'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'
//redux-thunk to fetch data using async, this thunk is called in Homepage
export const getProducts = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const item = await axios('/shoes')
      const productsList = item.data as Product[]
      dispatch(fetchProductsList(productsList))
    } catch (error) {
      dispatch(fetchError(error))
    }
  }
}

export const getProductsByCategory = (category: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const item = await axios(`/shoes${category}`)
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

export const getSizes = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const item = await axios(`/variant`)
      const sizeList = item.data as Size[]
      dispatch(fetchsizesList(sizeList))
    } catch (error) {
      dispatch(fetchError(error))
    }
  }
}

export const fetchsizesList = (size: Size[]) => {
  return {
    type: actionTypes.FETCH_SIZES_LIST,
    payload: size,
  }
}

export const getOneProduct = (id: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const item = await axios(`/shoes/${id}`)
      const product = item.data as Product
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

export const sortDataBy = (sortby: 'price' | 'title', asc: boolean) => {
  return {
    type: actionTypes.SORT_DATA_BY,
    payload: { sortby, asc },
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

type FetchSizesList = {
  type: typeof actionTypes.FETCH_SIZES_LIST
  payload: Size[]
}

type FetchOneProduct = {
  type: typeof actionTypes.FETCH_ONE_PRODUCT
  payload: Product
}

type SortDataBy = {
  type: typeof actionTypes.SORT_DATA_BY
  payload: { sortby: 'price' | 'title'; asc: boolean }
}

export type AllActions =
  | FetchError
  | FetchProductsList
  | FetchOneProduct
  | FetchSizesList
  | SortDataBy
