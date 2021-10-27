import { useSelector, useDispatch } from 'react-redux'
import { SetStateAction, useEffect, useState } from 'react'

import shoes from '../media/shoes.jpg'
import '../pages/pages.css'
import { getOneProduct } from '../redux/actions/productAction'
import { useParams } from 'react-router'
import { Store } from '../redux/reducers'
import { Product } from '../redux/types'
import { Link } from 'react-router-dom'
import { keys } from 'lodash'
import { insertToCart } from '../redux/actions/cartAction'

const ShoesPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)

  console.log('quantity', qty)

  const updateQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value))
  }
  useEffect(() => {
    dispatch(getOneProduct(id))
  }, [dispatch])

  const product = useSelector((state: Store) => {
    return state.productReducer.product
  })

  // const qty = useSelector((state: Store) => {
  //   return state.cartReducer.qty
  // })

  const handleAddToCart = () => {
    dispatch(insertToCart(product as Product, qty))
  }

  return (
    <div className="productScreen">
      <div className="productScreen__image">
        <img src={shoes} width="100%" height="70%" alt="shoe image"></img>
      </div>
      <div className="productScreen__info">
        <p>{product?.title}</p>
        <p>{product?.description}</p>
        <p>
          Price: <span>€{product?.price}</span>
        </p>
        <p>
          status:
          <span>{product?.countInStock ? ' in stock' : ' out of stock'}</span>
        </p>
        <p>
          Quantity
          <select value={qty} onChange={updateQty}>
            {[...Array(product?.countInStock).keys()].map((key) => (
              <option value={key + 1}>{key + 1}</option>
            ))}
          </select>
        </p>
        <p>
          <button className="productScreen__button" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link to="/api/v1" className="productScreen__link">
            Back
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ShoesPage
