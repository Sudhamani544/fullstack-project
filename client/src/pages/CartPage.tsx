import axios from 'axios'
import { stringify } from 'querystring'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import CartItem from '../components/CartItem'
import { Store } from '../redux/reducers'
import './pages.css'

const KEY =
  'pk_test_51KA8MvEYxcDx77I71lgX5tFsBn30420yrmiWwHsDhWHlc4uEmkosS3ctdwZ2IekycoN9lJ7giW43cVqiKIOWt7RH00461nLcVw'
const CartPage = () => {
  const cart = useSelector((state: Store) => {
    return state.cartReducer.cart
  })

  const getSubTotal = () => {
    return cart.reduce((price, item) => price + item.price * item.qty, 0)
  }

  const [stripeToken, setStripeToken] = useState('' as any)

  const onToken = (token: any) => {
    console.log(token)
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log('in makerequest')
        const res = await axios.post('http://localhost:5000/api/v1/payment', {
          tokenId: stripeToken?.id,
          amount: 2000,
        })
        console.log('payment info', res.data)
      } catch (err) {
        console.log(err)
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken])

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
        <StripeCheckout
          token={onToken}
          name="Nike Shoe"
          billingAddress
          shippingAddress
          stripeKey={KEY}
        >
          <button className="cartPage__btn">proceed to checkout</button>
        </StripeCheckout>
      </div>
    </div>
  )
}

export default CartPage
