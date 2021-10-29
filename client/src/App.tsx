import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ShoesPage from './pages/ShoesPage'
import CartPage from './pages/CartPage'
import './App.css'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div>
      <NavBar />

      <Switch>
        <Route exact path="/api/v1" component={HomePage} />
        <Route
          exact
          path="api/v1/shoes:category=category"
          component={HomePage}
        />
        <Route exact path="/api/v1/login" component={LoginPage} />
        <Route exact path="/api/v1/shoes/:id" component={ShoesPage} />
        <Route exact path="/api/v1/cart" component={CartPage} />
      </Switch>

      <footer className="footer">ajshdasjk kjdfhkd</footer>
    </div>
  )
}

export default App
