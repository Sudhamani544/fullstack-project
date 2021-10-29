import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import FavoriteBorder from '@mui/icons-material/Favorite'
import React from 'react'
import { Store } from '../redux/reducers'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Dialog } from '@mui/material'

const style = {
  color: 'white',
}
const FavoriteDialog = () => {
  const [open, setOpen] = React.useState(false)

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
      <Dialog onClose={handleClose} open={open}>
        <section>Favorite Page</section>
        {favorite.map((item) => {
          return (
            <div className="FavoriteIcon_display">
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width="130px"
                  height="110px"
                />
              </div>
              <div>
                <Link to={`/api/v1/shoes/${item.id}`} onClick={handleClose}>
                  {item.title}
                </Link>
              </div>
              <div>€ {item.price}</div>
              <div>
                <button>
                  <DeleteOutlineIcon />
                </button>
              </div>
            </div>
          )
        })}
      </Dialog>
    </div>
  )
}

export default FavoriteDialog
