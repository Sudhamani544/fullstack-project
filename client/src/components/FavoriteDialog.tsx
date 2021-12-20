import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Dialog } from '@mui/material'
import FavoriteBorder from '@mui/icons-material/Favorite'

import { Store } from '../redux/reducers'
import { removeFromFav } from '../redux/actions/favActions'

const style = {
  color: 'white',
}
const FavoriteDialog = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const favorite = useSelector((state: Store) => {
    return state.favReducer.fav
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <FavoriteBorder onClick={handleClickOpen} sx={style} />
      <Dialog onClose={handleClose} open={open} className="favoriteIcon">
        <section className="favoriteIcon__title">Favorite Page</section>
        {favorite.length === 0 ? (
          <div>
            Favorite Is Empty <Link to="/api/v1">Go Back</Link>
          </div>
        ) : (
          favorite.map((item) => {
            return (
              <div className="favoriteIcon_display" key={item._id}>
                <div>
                  <img
                    src={item.imageUrl[0]}
                    alt={item.title}
                    width="130px"
                    height="110px"
                  />
                </div>
                <div className="favoriteIcon__name">
                  <Link to={`/shoes/${item._id}`} onClick={handleClose}>
                    {item.title}
                  </Link>
                </div>
                <div>€{item.price}</div>
                <div>
                  <button onClick={() => dispatch(removeFromFav(item._id))}>
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </Dialog>
    </div>
  )
}

export default FavoriteDialog
