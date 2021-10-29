import axios from 'axios'
import GoogleLogin from 'react-google-login'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

type Response = {
  token: string
  userData: {}
}
const LoginPage = () => {
  const responseGoogle = async (response: any) => {
    //google will give back the id_token to the react frontend, we should issue this token to the user in backend
    const tokenId = response.tokenId
    const result = await axios.post<Response>('/google/login', {
      id_token: tokenId,
    })
    const token = result.data.token
    const userData = result.data.userData
    localStorage.setItem('token', result.data.token)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
  }
  return (
    <div style={{ height: '100vh' }}>
      <GoogleLogin
        clientId="109888488756-u7dtmvq01tqr1gmp87fkunbmr8i1im85.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LoginPage
