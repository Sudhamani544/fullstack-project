import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeFromCart } from '../redux/actions/cartAction'

type CartDrawerItemProps = {
  id: string
  title: string
  imageUrl: string
}
const CartDrawerItem = ({ id, title, imageUrl }: CartDrawerItemProps) => {
  const dispatch = useDispatch()

  const removeItem = () => {
    dispatch(removeFromCart(id))
  }
  return (
    <div>
      <li className="cartDrawerItem cartDrawerHeight">
        <img src={imageUrl} alt={title} width="100px" height="100px"></img>
        <Link to={`/api/v1/shoes/${id}`}>{title}</Link>
        <button onClick={removeItem}>
          <DeleteOutlineIcon />
        </button>
      </li>
    </div>
  )
}

export default CartDrawerItem
