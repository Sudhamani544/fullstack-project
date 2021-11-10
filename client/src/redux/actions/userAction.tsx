import { User } from '../types'
import * as actionTypes from '../constants/userConstants'

export const getJWTToken = (token: string) => {
  console.log('token', token)
  return {
    type: actionTypes.GET_JWT_TOKEN,
    payload: token,
  }
}

export const getUserData = (user: User) => {
  console.log()
  return {
    type: actionTypes.GET_USERDATA,
    payload: user,
  }
}

// export const isAdmin = (isAdmin: boolean) => ({
//   type: ActionTypes.isAdmin,
//   payload: {
//     isAdmin,
//   },
// })

// export const logOut = () => {
//   return {
//     type: ActionTypes.logOut,
//     payload: {
//       user: null,
//       userLoaded: false,
//       token: null,
//       cart: [],
//     },
//   }
// }

//literaltype
type FetchError = {
  type: typeof actionTypes.FETCH_ERROR
  payload: any
}

type GetJWTToken = {
  type: typeof actionTypes.GET_JWT_TOKEN
  payload: string
}

type GetUserData = {
  type: typeof actionTypes.GET_USERDATA
  payload: User
}

export type AllActions = FetchError | GetUserData | GetJWTToken
