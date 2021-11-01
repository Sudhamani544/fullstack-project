import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Component.css'
import HamburgerMenu from './HamburgerMenu'
import { Store } from '../redux/reducers'
import CartDrawer from './CartDrawer'
import FavoriteDialog from './FavoriteDialog'
import LoginLogout from './LoginLogout'

const style = {
  color: 'white',
} as const

const NavBar = () => {
  const cart = useSelector((state: Store) => {
    return state.cartReducer.cart
  })

  return (
    <nav className="navbar">
      <section className="navbar__logo">
        <Link to={'/api/v1'} className="shopHover">
          Home
        </Link>
      </section>

      <section className="navbar__category">
        <li>
          <Link to={`/api/v1?category=women`}>women</Link>
        </li>
        <li>
          <Link to={`/api/v1?category=men`}>men</Link>
        </li>
        <li>
          <Link to={`/api/v1?category=kids`}>kids</Link>
        </li>
      </section>

      <section className="navbar__links">
        <li>
          <FavoriteDialog />
        </li>
        <li>
          <CartDrawer />
        </li>
        <li>
          <LoginLogout />
        </li>
      </section>

      <HamburgerMenu />
    </nav>
  )
}

export default NavBar
