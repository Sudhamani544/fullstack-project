import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import shoes from '../media/shoes.jpg'
import '../pages/pages.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../redux/reducers'
import { insertToFav, removeFromFav } from '../redux/actions/favActions'

type ProductCardComponent = {
  imageUrl: string
  price: number
  title: string
  id: string
}

const CardComponent = ({
  imageUrl,
  price,
  title,
  id,
}: ProductCardComponent) => {
  const isInFav = useSelector((state: Store) =>
    state.favReducer.fav.some((item) => item.id === id)
  )

  const dispatch = useDispatch()

  const handleButton = () => {
    if (isInFav) {
      dispatch(removeFromFav(id))
    } else {
      dispatch(insertToFav(imageUrl, price, title, id))
    }
  }

  return (
    <div className="card">
      <Card>
        <CardMedia component="img" height="200" image={shoes} alt={title} />
        <CardContent>
          <Typography component="div">{title}</Typography>
          <Typography>€{price}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <FavoriteIcon
              onClick={handleButton}
              color={isInFav ? 'primary' : 'action'}
              className="favIcon"
            />
          </Button>
          <Link to={`/api/v1/shoes/${id}`} className="card__button">
            view
          </Link>
        </CardActions>
      </Card>
    </div>
  )
}

export default CardComponent
