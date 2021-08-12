import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import StorePage from './components/StorePage'

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Route path="/" component={Home} exact/>
      <Route path="/search/:keyword" component={StorePage} />
      <Route path="/product/:id" component={ProductDetails} exact />
      <Route path="/Trgovina" component={StorePage} exact />

      <Footer />
    </div>
    </Router>
  );
}

export default App;
