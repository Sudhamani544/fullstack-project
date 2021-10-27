import React from 'react'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import Drawer from '@mui/material/Drawer'
import { Link } from 'react-router-dom'

import './Component.css'
import HamburgerMenu from './HamburgerMenu'
import { Store } from '../redux/reducers'
import { useSelector } from 'react-redux'
import CartDrawer from './CartDrawer'
import FavoriteDialog from './FavoriteDialog'

const style = {
  color: 'white',
} as const

const NavBar = () => {
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
    <nav className="navbar">
      {/* icon */}
      <div className="navbar__logo">
        <h2>shopping cart</h2>
      </div>

      {/* shopping cart icon and badge */}
      <ul className="navbar__links">
        <li>
          <FavoriteDialog />
        </li>
        <li>
          <Badge badgeContent={cart.length} color="primary" showZero>
            <ShoppingCartIcon onClick={toggleDrawer(true)} sx={style} />
          </Badge>
          <Drawer
            anchor="right"
            open={state}
            onClose={toggleDrawer(false)}
            className="cartDrawer"
          >
            <p className="drawer__cart">Cart</p>
            <p>cart is empty</p>
            <button onClick={toggleDrawer(false)}>
              {cart.length ? <CartDrawer /> : '   cart is empty   '}
              <Link to="/api/v1/cart">view cart</Link>
            </button>
          </Drawer>
        </li>
        <li>
          <Link className="shopHover" to="/api/v1">
            shop
          </Link>
        </li>
      </ul>

      <HamburgerMenu />
    </nav>
  )
}

export default NavBar
