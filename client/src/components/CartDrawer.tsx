import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import Drawer from '@mui/material/Drawer'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { Store } from '../redux/reducers'
import { removeFromCart } from '../redux/actions/cartAction'

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
      <Badge
        onClick={toggleDrawer(true)}
        badgeContent={cart.length}
        color="primary"
        showZero
      >
        <ShoppingCartIcon sx={style} />
      </Badge>
      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        className="cartDrawer"
      >
        <section className="drawer__cart">Cart</section>
        {cart.length === 0 ? (
          <section>
            Cart Is Empty &nbsp;
            <Link to="/api/v1">Go Back</Link>
          </section>
        ) : (
          <section>
            {cart.map((item) => (
              <li className="cartDrawerItem cartDrawerHeight" key={item.id}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width="100px"
                  height="100px"
                ></img>
                <Link
                  to={`/api/v1/shoes/${item.id}`}
                  className="cartItem__product"
                >
                  {item.title}
                </Link>

                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  <DeleteOutlineIcon />
                </button>
              </li>
            ))}
          </section>
        )}
        <button className="cartDrawerToggle" onClick={toggleDrawer(false)}>
          <Link to="/api/v1/cart" className="cartDrawer__button">
            view cart
          </Link>
        </button>
      </Drawer>
    </div>
  )
}

export default CartDrawer
