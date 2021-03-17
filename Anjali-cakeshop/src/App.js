import './App.css';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Cakedetails from './components/Cakedetails';
import Search from './components/Search';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import Checkout from './components/Checkout'
import ErrorPage from './components/ErrorPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPw from './components/ResetPw';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import OrderSuccess from './components/OrderSuccess';


class App extends Component{
  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      username: "new user",
      searchQuery: ""
    }
  }
  componentDidMount = () => {
    if(localStorage.token){
      this.setState({username: localStorage.name, isLoggedIn: true})
    }
  }

  logOut = () => {
    localStorage.clear()
    window.location.href = "/"
  }
  render = () => {
    return (
      <div className="App">
        <Router> 
          <ToastContainer />
          <Navbar username={this.state.username} logOut={this.logOut}/>     
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/cart' component={Cart} />
            <Route path='/search'><Search query={this.state.searchQuery}/></Route>
            <Route path='/product' component={Product} />
            <Route path='/login'><Login /></Route>
            <Route path='/signup' component={Signup} />
            <Route path='/forgot' component={ResetPw} />
            <Route exact path='/showcake/:cakeid' component={Cakedetails} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={OrderSuccess} />
            <Route path='/*' component={ErrorPage} />            
          </Switch> 
        </Router>
      </div>
    );
  }
}

export default App;