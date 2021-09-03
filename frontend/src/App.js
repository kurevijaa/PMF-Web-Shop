import { useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import StorePage from './components/StorePage'
import Login from './components/user/Login'
import Register from './components/user/Register'
import { loadUser } from './actions/userActions'
import store from './store'


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])


  return (
    <Router>
    <div className="App">
      <Header/>
      <Route path="/" component={Home} exact/>
      <Route path="/search/:keyword" component={StorePage} />
      <Route path="/product/:id" component={ProductDetails} exact />
      <Route path="/Trgovina" component={StorePage} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />


      <Footer />
    </div>
    </Router>
  );
}

export default App;
