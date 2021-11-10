import { Cart, Product } from '../types'
import { AllActions } from '../actions/cartAction'
import * as actionTypes from '../constants/cartConstants'

type DefaultState = {
  cart: Cart[]
  cartDb: Product[]
  error: any
}

const defaultState: DefaultState = {
  cart: [],
  cartDb: [],
  error: null,
}

const cartReducer = (
  state = defaultState,
  action: AllActions
): DefaultState => {
  //action = {type: "action type",payload: {...}}
  //state = {cart: []}
  switch (action.type) {
    case actionTypes.INSERT_TO_CART:
      const productItem = action.payload // product object
      // existCountry will be a country object, or undefined if nothing matches the condition
      const existProduct = state.cart.find((item) => {
        if (productItem._id === item._id && productItem.size === item.size) {
          return true
        }
        return false
      })
      if (existProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === existProduct._id ? productItem : item
          ),
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, productItem],
        }
      }

    case actionTypes.FETCH_SHOES_FROM_DB:
      const productsPayload = action.payload
      return {
        ...state,
        cartDb: [...state.cartDb, productsPayload],
      }

    case actionTypes.REMOVE_FROM_CART:
      const getProduct = action.payload
      return {
        ...state,
        cart: [...state.cart.filter((item) => getProduct !== item._id)],
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

export default cartReducer
