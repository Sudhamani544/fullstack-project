import { Product, Size } from '../types'
import { AllActions } from '../actions/productAction'
import * as actionTypes from '../constants/productConstants'

type DefaultState = {
  products: Product[]
  product: Product | null
  sizes: Size[]
  error: any
}

const defaultState: DefaultState = {
  products: [],
  sizes: [],
  product: null,
  error: null,
}

const productReducer = (
  state = defaultState,
  action: AllActions
): DefaultState => {
  //action = {type: "action type",payload: {...}}
  //state = {cart: []}
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LIST:
      const productsPayload = action.payload
      return {
        ...state,
        products: productsPayload,
      }

    case actionTypes.FETCH_ONE_PRODUCT:
      const productData = action.payload
      return {
        ...state,
        product: productData,
      }

    case actionTypes.FETCH_SIZES_LIST:
      const sizesPayload = action.payload
      return {
        ...state,
        sizes: sizesPayload,
      }
    case actionTypes.FETCH_ERROR:
      const errorFromPayload = action.payload
      return {
        ...state,
        error: errorFromPayload,
      }

    default:
      return state
  }
}

export default productReducer
