import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ShoesPage from './pages/ShoesPage'
import CartPage from './pages/CartPage'
import './App.css'
import NavBar from './components/NavBar'

type Response = {
  token: string
}
function App() {
  const responseGoogle = async (response: any) => {
    // console.log(response.tokenId)
    //google will give back the id_token to the react frontend, we should issue this token to the user in backend
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
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/api/v1" component={HomePage} />
          <Route exact path="/api/v1/shoes/:id" component={ShoesPage} />
          <Route exact path="/api/v1/cart" component={CartPage} />
        </Switch>
        <GoogleLogin
          clientId="109888488756-u7dtmvq01tqr1gmp87fkunbmr8i1im85.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <footer style={{ position: 'fixed', bottom: 0 }}>
          ajshdasjk kjdfhkd
        </footer>
      </Router>
    </div>
  )
}

export default App
