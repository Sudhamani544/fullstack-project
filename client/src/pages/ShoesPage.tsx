import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

import '../pages/pages.css'
import { getOneProduct, getSizes } from '../redux/actions/productAction'
import { Store } from '../redux/reducers'
import { Product } from '../redux/types'
import { insertToCart } from '../redux/actions/cartAction'

const ShoesPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const [vSize, setVSize] = useState(0)

  const updateSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVSize(parseInt(e.target.value))
  }

  useEffect(() => {
    dispatch(getOneProduct(id))
  }, [dispatch])

  const product = useSelector((state: Store) => {
    return state.productReducer.product
  })

  useEffect(() => {
    dispatch(getSizes())
  }, [dispatch])

  const sizes = useSelector((state: Store) => {
    return state.productReducer.sizes
  })

  const handleAddToCart = () => {
    dispatch(insertToCart(product as Product, vSize))
  }

  return (
    <div className="productScreen">
      <div className="productScreen__image">
        <img
          src={product?.imageUrl}
          width="100%"
          height="50%"
          alt="shoe image"
        ></img>
      </div>

      <div className="productScreen__info">
        <div>
          <h2>{product?.title}</h2>
          <p>{product?.category}'s shoes</p>
          <p>€{product?.price}</p>
        </div>
        <div>
          <p>{product?.description}</p>
        </div>
        <div>
          <h3>size</h3>
          <p>
            <select value={vSize} onChange={updateSize}>
              {sizes.map((s) => (
                <option value={s.size}>{s.size}</option>
              ))}
            </select>
          </p>
        </div>

        <p>
          <button className="productScreen__button" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link to="/api/v1" className="productScreen__link">
            Shop
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ShoesPage
