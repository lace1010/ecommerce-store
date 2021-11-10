import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Success from './pages/Success.jsx';
import ScrollToTop from "./components/scrollToTopRouter.jsx";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {
  let user = useSelector(state => state.user.currentUser.currentUser);
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/products/">
            <ProductList/>
          </Route>
          <Route path="/products/:category">
            <ProductList/>
          </Route>
          <Route path="/product/:id">
            <Product/>
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/"/> : <Register/>}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/> : <Login/>}
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/success">
            <Success/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
};

export default App;