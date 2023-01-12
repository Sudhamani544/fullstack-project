import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

import '../pages/pages.css'
import { getOneProduct, getSizes } from '../redux/actions/productAction'
import { Store } from '../redux/reducers'
import { Product, User } from '../redux/types'
import {
  fetchShoesFromDB,
  getShoesFromDB,
  insertToCart,
  insertToDBCart,
} from '../redux/actions/cartAction'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

const ShoesPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const [vSize, setVSize] = useState(0)
  const [qty, setQty] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null)

  const updateSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVSize(parseInt(e.target.value))
  }

  const updateQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value))
  }

  useEffect(() => {
    dispatch(getOneProduct(id))
  }, [id])

  const product = useSelector((state: Store) => {
    return state.productReducer.product
  })

  useEffect(() => {
    dispatch(getSizes())
  }, [dispatch])

  const sizes = useSelector((state: Store) => {
    return state.productReducer.sizes
  })

  const token = useSelector((state: Store) => {
    return state.userReducer.token
  })

  const user = useSelector((state: Store) => {
    return state.userReducer.user
  })

  const handleAddToCart = (e: any) => {
    token
      ? dispatch(
          insertToDBCart(
            product as Product,
            user as User,
            token as string,
            qty as number
          )
        )
      : dispatch(insertToCart(product as Product, vSize, qty))
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div className="productScreen">
      <div className="productScreen__image">
        <img
          src={product?.imageUrl[0]}
          width="100%"
          height="50%"
          alt="shoe image"
        ></img>
      </div>

      <div className="productScreen__info">
        <section>
          <h2>{product?.title}</h2>
          <p>{product?.category}'s shoes</p>
          <p>€{product?.price}</p>
        </section>
        <section>
          <p>{product?.description}</p>
        </section>
        <section>
          <h3>size</h3>
          <p>
            <select value={vSize} onChange={updateSize}>
              {sizes.map((s) => (
                <option value={s.size}>{s.size}</option>
              ))}
            </select>
          </p>
        </section>
        <section>
          <h3>quantity</h3>
          <p>
            <select value={qty} onChange={updateQty}>
              {[...Array(5).keys()].map((x) => (
                <option value={x + 1}>{x + 1}</option>
              ))}
            </select>
          </p>
        </section>
        <p>
          <button className="productScreen__button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Popover
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>Product added to Cart</Typography>
          </Popover>
          <Link to="/" className="productScreen__link">
            Shop
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ShoesPage
