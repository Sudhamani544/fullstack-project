import { Fav, Product } from '../types'
import { AllActions } from '../actions/favActions'
import * as actionTypes from '../constants/favConstants'

type DefaultState = {
  fav: Fav[]
  error: any
}

const defaultState: DefaultState = {
  fav: [],
  error: null,
}

const favReducer = (state = defaultState, action: AllActions): DefaultState => {
  //action = {type: "action type",payload: {...}}
  //state = {cart: []}
  switch (action.type) {
    case actionTypes.INSERT_TO_FAV:
      const productItem = action.payload // product object
      const incomingProductId = productItem._id
      // existCountry will be a country object, or undefined if nothing matches the condition
      const existProduct = state.fav.find((item) => {
        if (incomingProductId === item._id) {
          return true
        }
        return false
      })
      if (existProduct) {
        return state
      } else {
        return {
          ...state,
          fav: [...state.fav, productItem],
        }
      }

    case actionTypes.REMOVE_FROM_FAV:
      const getProductId = action.payload // country name
      return {
        ...state,
        fav: [...state.fav.filter((item) => getProductId !== item._id)],
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

export default favReducer
