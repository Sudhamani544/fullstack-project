import { combineReducers } from 'redux'

import cartReducer from './cartReducer'
import favReducer from './favReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({ cartReducer, productReducer, favReducer })

export type Store = ReturnType<typeof rootReducer>

export default rootReducer
