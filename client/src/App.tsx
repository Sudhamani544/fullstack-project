import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

import './App.css'

type Response = {
  token: string
}
function App() {
  const responseGoogle = async (response: any) => {
    // console.log(response.tokenId)
    const tokenId = response.tokenId
    const result = await axios.post<Response>(
      'http://localhost:5000/api/v1/google/login',
      {
        id_token: tokenId,
      }
    )
    // console.log('result', result.data.token)
    localStorage.setItem('token', result.data.token)
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId="109888488756-u7dtmvq01tqr1gmp87fkunbmr8i1im85.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default App
