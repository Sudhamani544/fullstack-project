import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import CardComponent from '../components/CardComponent'
import '../pages/pages.css'
import { getProducts } from '../redux/actions/productAction'
import { Product } from '../redux/types'
import { Store } from '../redux/reducers'

const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  // const [error, countries] = useCountries(
  //   "https://restcountries.eu/rest/v2/all"
  // );
  const products: Product[] = useSelector((state: Store) => {
    return state.productReducer.products
  })

  return (
    <div className="homepage">
      {products.map((product) => (
        <CardComponent
          key={product._id}
          id={product._id}
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  )
}

export default HomePage
