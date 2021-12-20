import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Component.css'
import { Cart } from '../redux/types'
import { removeFromCart } from '../redux/actions/cartAction'
import { Store } from '../redux/reducers'

const CartItem = (item: Cart) => {
  const dispatch = useDispatch()

  const deleteItem = () => {
    dispatch(removeFromCart(item._id))
  }

  const sizes = useSelector((state: Store) => {
    return state.productReducer.sizes
  })

  return (
    <div className="cartItem">
      <div>
        <img
          src={item.imageUrl[0]}
          alt={item.title}
          width="130px"
          height="110px"
        />
      </div>
      <div className="cartItem__product">
        <Link to={`/shoes/${item._id}`}>{item.title}</Link>
      </div>
      <div>
        <p>Price: €{item.price}</p>
      </div>
      <div>
        Size
        <select value={item.size}>
          {sizes.map((s) => (
            <option value={s.size}>{s.size}</option>
          ))}
        </select>
      </div>
      <section>
        <p>Quantity: {item.qty}</p>
      </section>
      <div>
        <button onClick={deleteItem}>
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  )
}

export default CartItem
