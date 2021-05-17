import "./App.css";
import Navbar from "./components/home/Navbar";
import Home from "./components/home/Home";
import Cakedetails from "./components/home/Cakedetails";
import Search from "./components/commonComps/Search";
import Cart from "./components/cart/Cart";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import AddCake from "./components/home/AddCake";
import Checkout from "./components/cart/Checkout";
import ErrorPage from "./components/commonComps/ErrorPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ResetPw from "./components/user/ResetPw";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import OrderSuccess from "./components/cart/OrderSuccess";
import Footer from "./components/commonComps/Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: "new user",
      searchQuery: "",
    };
  }
  componentDidMount = () => {
    if (localStorage.token) {
      this.setState({ username: localStorage.name, isLoggedIn: true });
    }
  };

  logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  render = () => {
    return (
      <div className="app">
        <Router>
          <ToastContainer />
          <Navbar username={this.state.username} logOut={this.logOut} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/search">
              <Search query={this.state.searchQuery} />
            </Route>
            <Route path="/product" component={AddCake} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup" component={Signup} />
            <Route path="/forgot" component={ResetPw} />
            <Route exact path="/showcake/:cakeid" component={Cakedetails} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={OrderSuccess} />
            <Route path="/*" component={ErrorPage} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  };
}

export default App;
