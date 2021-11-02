import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CartItem from '../components/CartItem'
import { Store } from '../redux/reducers'
import './pages.css'

const CartPage = () => {
  const cart = useSelector((state: Store) => {
    return state.cartReducer.cart
  })

  const getSubTotal = () => {
    return cart.reduce((price, item) => price + item.price * item.qty, 0)
  }

  return (
    <div className="cartPage" style={{ minHeight: '80vh' }}>
      <div className="cartPage__left">
        <h2 className="cartpage__title">My Cart</h2>
        {cart.length === 0 ? (
          <div>
            Cart Is Empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          cart.map((item) => <CartItem {...item} />)
        )}
      </div>
      <div className="cartPage__right">
        <h2>Order Summary</h2>
        <p className="cartpage__title">Subtotal €{getSubTotal()}</p>
        <button className="cartPage__btn">proceed to checkout</button>
      </div>
    </div>
  )
}

export default CartPage
