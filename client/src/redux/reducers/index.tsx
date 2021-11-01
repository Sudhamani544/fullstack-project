import { combineReducers } from 'redux'

import cartReducer from './cartReducer'
import favReducer from './favReducer'
import productReducer from './productReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  cartReducer,
  productReducer,
  favReducer,
  userReducer,
})

export type Store = ReturnType<typeof rootReducer>

export default rootReducer
