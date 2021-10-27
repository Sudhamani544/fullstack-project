import React from 'react'
import { useSelector } from 'react-redux'

import CartItem from '../components/CartItem'
import { Store } from '../redux/reducers'
import './pages.css'

const CartPage = () => {
  const cart = useSelector((state: Store) => {
    return state.cartReducer.cart
  })

  return (
    <div className="cartPage">
      <div className="cartPage__left">
        <h2 className="cartpage__title">My Cart</h2>
        {cart.map((item) => (
          <CartItem {...item} />
        ))}
      </div>
      <div className="cartPage__right">
        <h2>Order Summary</h2>
        <p className="cartpage__title">Subtotal €50</p>
        <button className="cartPage__btn">proceed to checkout</button>
      </div>
    </div>
  )
}

export default CartPage
