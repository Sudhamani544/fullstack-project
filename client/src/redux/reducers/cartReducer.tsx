import { Cart, Product } from '../types'
import { AllActions } from '../actions/cartAction'
import * as actionTypes from '../constants/cartConstants'

type DefaultState = {
  cart: Cart[]
  error: any
}

const defaultState: DefaultState = {
  cart: [],
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
        if (productItem.id === item.id && productItem.size === item.size) {
          return true
        }
        return false
      })
      if (existProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existProduct.id ? productItem : item
          ),
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, productItem],
        }
      }

    case actionTypes.REMOVE_FROM_CART:
      const getProductId = action.payload // country name
      return {
        ...state,
        cart: [...state.cart.filter((item) => getProductId !== item.id)],
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
