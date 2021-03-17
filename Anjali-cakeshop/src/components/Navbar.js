import { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FA from 'react-fontawesome';

class Navbar extends Component {
    constructor(){
        super()
        this.state = {
            username: "new user",
            query: ''
        }
        
    }
    componentDidMount(){
        this.setState({username:this.props.username}, () => {console.log("state name:", this.state.username);})
    }
    getQuery= (event)=> {
        this.setState({query: event.target.value}, () => console.log(this.state))
    }
    searchCakes = (event) => {
        event.preventDefault()
        var url = '/search?cakeQuery='+this.state.query
        this.props.history.push(url);
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{backgroundColor: "#2b1d0e", color: "white"}}>
                <div className="container-fluid">
                <Link to="/home"><a style={{color: "white"}} className="navbar-brand">My Cake Shop <FA name="birthday-cake" /></a></Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home"><a style={{color: "white"}} className="nav-link active" aria-current="page">Home</a></Link>                           
                            </li>
                            {this.props.isLoggedIn && <li className="nav-item">
                            <Link to="/cart"><a style={{color: "white"}} className="nav-link" aria-current="page">Cart</a></Link>
                            </li>}
                            {this.props.isLoggedIn && <li className="nav-item">
                            <Link to="/orders"><a style={{color: "white"}} className="nav-link" aria-current="page">Orders</a></Link>
                            </li>}
                            {this.props.isLoggedIn && <div><li className="nav-item">
                            <Link to="/product"><a style={{color: "white"}} className="nav-link" aria-current="page">Add Cake</a></Link>
                            </li></div>}
                            
                            {!this.props.isLoggedIn && <div><li className="nav-item">
                                <Link to="/login"><a style={{color: "white"}} className="nav-link" aria-current="page">Login</a></Link>                           
                            </li></div>}
                            {this.props.isLoggedIn && <div onClick={this.props.logOut}><li className="nav-item">
                                <Link to="/home"><a style={{color: "white"}} className="nav-link" aria-current="page">Logout</a></Link>                           
                            </li></div>}
                            {!this.props.isLoggedIn && <div><li className="nav-item">
                            <Link to="/signup"><a style={{color: "white"}} className="nav-link" aria-current="page">Sign Up</a></Link>
                            </li></div>}
                            
                        </ul>
                        <p style={{padding:"0 50px", marginTop:"10px"}}>Hello {this.props.username}!</p>
                        <form className="d-flex">
                            <input className="form-control me-2" id="searchQuery" type="search" placeholder="Search cakes" aria-label="Search" onChange={this.getQuery} />
                            <button className="btn btn-light" disabled={this.state.query === ""} onClick={this.searchCakes} type="submit"><FA name="search" /></button>
                        </form>
                    </div>
                </div>
            </nav>
    
        );
    }
}
var NavbarWithRouter = withRouter(Navbar)
export default connect(function(state){
    return {
        isLoggedIn: state["isloggedin"],
        username: state["username"]
    }
}) (NavbarWithRouter);