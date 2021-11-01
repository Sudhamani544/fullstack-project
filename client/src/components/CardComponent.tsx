import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'

import '../pages/pages.css'
import { Store } from '../redux/reducers'
import { insertToFav, removeFromFav } from '../redux/actions/favActions'

const style = {
  color: 'red',
} as const

type ProductCardComponent = {
  imageUrl: string
  price: number
  title: string
  id: string
  category: string
  shoeCategory: string
}

const CardComponent = ({
  imageUrl,
  price,
  title,
  category,
  shoeCategory,
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
      <Card className="card__link">
        <Link to={`/api/v1/shoes/${id}`}>
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={title}
          />
          <CardContent>
            <Typography component="div" align="center">
              {title}
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary">
              {category}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {shoeCategory}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              €{price}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <Button size="small">
            <FavoriteIcon
              onClick={handleButton}
              color={isInFav ? 'secondary' : 'action'}
              className="favIcon"
            />
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CardComponent
