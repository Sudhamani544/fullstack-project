import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { removeFromCart } from '../redux/actions/cartAction'
import { Store } from '../redux/reducers'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Drawer from '@mui/material/Drawer'
import { Cart } from '../redux/types'
import CartDrawerItem from './CartDrawerItem'

const style = {
  color: 'white',
} as const

function CartDrawer() {
  const dispatch = useDispatch()
  const cart = useSelector((state: Store) => {
    return state.cartReducer.cart
  })

  const [state, setState] = React.useState(false)

  const toggleDrawer = (open: boolean) => (event: any) => {
    event.preventDefault()
    console.log('event', event)
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setState(open)
  }

  return (
    <div>
      <Badge badgeContent={cart.length} color="primary" showZero>
        <ShoppingCartIcon onClick={toggleDrawer(true)} sx={style} />
      </Badge>
      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        className="cartDrawer"
      >
        <div className="drawer__cart">Cart</div>

        {cart.map((item) => (
          <CartDrawerItem
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
          />
        ))}

        <button onClick={toggleDrawer(false)} className="cartDrawerToggle">
          <Link to="/api/v1/cart" className="cartDrawer__button">
            view cart
          </Link>
        </button>
      </Drawer>
    </div>
  )
}

export default CartDrawer
