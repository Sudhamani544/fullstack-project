import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Component.css'
import HamburgerMenu from './HamburgerMenu'
import { Store } from '../redux/reducers'
import CartDrawer from './CartDrawer'
import FavoriteBorder from '@mui/icons-material/Favorite'
import FavoriteDialog from './FavoriteDialog'
import LoginLogout from './LoginLogout'
import { Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

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
        <Link to={'/'} className="shopHover">
          Home
        </Link>
      </section>

      <section className="navbar__category">
        <li>
          <Link to={`/?category=women`}>women</Link>
        </li>
        <li>
          <Link to={`/?category=men`}>men</Link>
        </li>
        <li>
          <Link to={`/?category=kids`}>kids</Link>
        </li>
      </section>

      <section className="navbar__links">
        <li>
          <FavoriteDialog />
        </li>
        <li>
          <Link to={`/cart`}>
            <Badge
              // onClick={toggleDrawer(true)}
              badgeContent={cart.length}
              color="primary"
              showZero
            >
              <ShoppingCartIcon sx={style} />
            </Badge>
          </Link>
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
