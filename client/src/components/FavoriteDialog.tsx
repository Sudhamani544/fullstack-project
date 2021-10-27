import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import FavoriteBorder from '@mui/icons-material/Favorite'
import React from 'react'
import { Store } from '../redux/reducers'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import shoes from '../media/shoes.jpg'

const style = {
  color: 'white',
}
const FavoriteDialog = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const favorite = useSelector((state: Store) => {
    return state.favReducer.fav
  })

  return (
    <div>
      <Button onClick={handleOpen}>
        <FavoriteBorder sx={style} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="FavoriteIcon__Dialog">
          Favorite Page
          {favorite.map((item) => {
            return (
              <div className="FavoriteIcon_display">
                <div>
                  <img
                    src={shoes}
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
        </Box>
      </Modal>
    </div>
  )
}

export default FavoriteDialog
