import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { removeFromFav } from '../redux/actions/favActions'
import { Store } from '../redux/reducers'

import { Cart } from '../redux/types'

function CartDrawer() {
  const dispatch = useDispatch()
  const cart = useSelector((state: Store) => {
    return state.cartReducer.cart
  })

  return (
    <div>
      {cart.map((item) => {
        return (
          <div key={item.title}>
            <li className="cartDrawer">
              <img
                src={item.imageUrl}
                alt={item.title}
                width="100px"
                height="60px"
              ></img>
              <Link to={`/api/v1/shoes/${item.id}`}>{item.title}</Link>
              <button onClick={() => dispatch(removeFromFav(item.id))}>
                <DeleteOutlineIcon />
              </button>
            </li>
          </div>
        )
      })}
    </div>
  )
}

export default CartDrawer
