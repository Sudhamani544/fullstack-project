import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import CardComponent from '../components/CardComponent'
import '../pages/pages.css'
import {
  getProducts,
  getProductsByCategory,
} from '../redux/actions/productAction'
import { Product } from '../redux/types'
import { Store } from '../redux/reducers'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const dispatch = useDispatch()

  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const category = searchParams.get('category')

  useEffect(() => {
    if (category === null) {
      dispatch(getProducts())
    } else {
      dispatch(getProductsByCategory(search))
    }
  }, [dispatch, category])

  const products: Product[] = useSelector((state: Store) => {
    return state.productReducer.products
  })

  return (
    <div className="homepage  homepage__image">
      {products.map((product) => (
        <CardComponent
          key={product._id}
          id={product._id}
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
          category={product.category}
          shoeCategory={product.shoeCategory}
        />
      ))}
    </div>
  )
}

export default HomePage
