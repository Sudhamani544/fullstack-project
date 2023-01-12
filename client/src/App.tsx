import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ShoesPage from './pages/ShoesPage'
import CartPage from './pages/CartPage'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shoes/:id" component={ShoesPage} />
        <Route exact path="/cart" component={CartPage} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
