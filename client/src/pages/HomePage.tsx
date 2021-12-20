import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import CardComponent from '../components/CardComponent'
import '../pages/pages.css'
import {
  getProducts,
  getProductsByCategory,
} from '../redux/actions/productAction'
import { Product } from '../redux/types'
import { Store } from '../redux/reducers'
import SearchSort from '../components/SearchSort'

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

  const [searchInput, setSearchInput] = useState<string>('')
  const onSearchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  console.log('searchInput', searchInput)

  const products: Product[] = useSelector((state: Store) => {
    return state.productReducer.products
  })

  return (
    <div>
      <SearchSort searchInput={searchInput} onSearchData={onSearchData} />
      <section className="homepage  homepage__image">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((product) => (
            <CardComponent
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl[0]}
              category={product.category}
              shoeCategory={product.shoeCategory}
            />
          ))}
      </section>
    </div>
  )
}

export default HomePage
