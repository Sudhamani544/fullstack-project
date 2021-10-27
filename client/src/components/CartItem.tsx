import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { Link } from 'react-router-dom'
import shoes from '../media/shoes.jpg'
import './Component.css'
import { Cart } from '../redux/types'
const CartItem = (item: Cart) => {
  console.log('item', item)
  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img src={shoes} alt={item.title} width="130px" height="110px" />
      </div>
      <div className="cartItem__product">
        <Link to={`/api/v1/shoes/${item.id}`}>{item.title}</Link>
      </div>
      <div>
        <p>Price: €{item.price}</p>
      </div>
      <div>
        Quantity
        <select value={item.qty}>
          {[...Array(item?.countInStock).keys()].map((key) => (
            <option value={key + 1}>{key + 1}</option>
          ))}
        </select>
      </div>
      <div>
        <button>
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  )
}

export default CartItem
