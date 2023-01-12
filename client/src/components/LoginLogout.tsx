import axios from 'axios'
import { useState } from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShoesFromDB, getShoesFromDB } from '../redux/actions/cartAction'
import { getJWTToken, getUserData } from '../redux/actions/userAction'
import { Store } from '../redux/reducers'
import { User } from '../redux/types'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

type Response = {
  token: string
  userData: User
}
const LoginPage = () => {
  const dispatch = useDispatch()

  const [login, setLogin] = useState(true)
  const [logout, setLogout] = useState(false)

  const responseGoogle = async (response: any) => {
    //google will give back the id_token to the react frontend, we should issue this token to the user in backend
    setLogin(false)
    setLogout(true)
    const tokenId = response.tokenId
    const result = await axios.post<Response>('/google/login', {
      id_token: tokenId,
    })
    const userData = result.data.userData
    const token = result.data.token
    localStorage.setItem('token', token)
    console.log('userdata', userData)
    dispatch(getUserData(userData))
    dispatch(getJWTToken(token))
    dispatch(getShoesFromDB(userData._id, token))
  }

  const user = useSelector((state: Store) => {
    return state.userReducer.user
  })

  const onSignoutSuccess = () => {
    localStorage.removeItem('token')
    const token = ''
    const shoes = null
    dispatch(getJWTToken(token))
    dispatch(fetchShoesFromDB(shoes, token))
    console.log('logout and empty cart')
    setLogin(true)
    setLogout(false)
  }

  return (
    <div>
      {login ? (
        <GoogleLogin
          clientId="109888488756-u7dtmvq01tqr1gmp87fkunbmr8i1im85.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      ) : null}

      {logout ? (
        <section className="logout__display">
          <p className="logout__name">{user?.firstName}</p>
          <GoogleLogout
            clientId="109888488756-u7dtmvq01tqr1gmp87fkunbmr8i1im85.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={onSignoutSuccess}
          />
        </section>
      ) : null}
    </div>
  )
}

export default LoginPage
