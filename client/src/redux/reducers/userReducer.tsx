import { User } from '../types'
import { AllActions } from '../actions/userAction'
import * as actionTypes from '../constants/userConstants'

type DefaultState = {
  user: User | null
  error: any
  token: string | null
}

const defaultState: DefaultState = {
  user: null,
  error: null,
  token: null,
}

const userReducer = (
  state = defaultState,
  action: AllActions
): DefaultState => {
  //action = {type: "action type",payload: {...}}
  //state = {cart: []}
  switch (action.type) {
    case actionTypes.GET_USERDATA:
      const userData = action.payload
      return {
        ...state,
        user: userData,
      }

    case actionTypes.GET_JWT_TOKEN:
      const tokenId = action.payload
      return {
        ...state,
        token: tokenId,
      }

    default:
      return state
  }
}

export default userReducer
