import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import './Component.css'
import HamburgerMenu from './HamburgerMenu'
import { Store } from '../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'
import CartDrawer from './CartDrawer'
import FavoriteDialog from './FavoriteDialog'
import { getProductsByCategory } from '../redux/actions/productAction'

const style = {
  color: 'white',
} as const

const NavBar = () => {
  const cart = useSelector((state: Store) => {
    return state.cartReducer.cart
  })

  return (
    <nav className="navbar">
      {/* icon */}
      <div className="navbar__logo">
        <Link to={'/api/v1'} className="shopHover">
          Home
        </Link>
      </div>

      <div className="navbar__category">
        <li>
          <Link to={`/api/v1?category=women`}>women</Link>
        </li>
        <li>
          <Link to={`/api/v1?category=men`}>men</Link>
        </li>
        <li>
          <Link to={`/api/v1?category=kids`}>kids</Link>
        </li>
      </div>

      {/* shopping cart icon and badge */}
      <ul className="navbar__links">
        <li>
          <FavoriteDialog />
        </li>
        <li>
          <CartDrawer />
        </li>
        <li>
          <Link className="shopHover" to="/api/v1/login">
            login
          </Link>
        </li>
      </ul>

      <HamburgerMenu />
    </nav>
  )
}

export default NavBar
