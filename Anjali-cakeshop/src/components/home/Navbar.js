import { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Cake, Search } from "@material-ui/icons";

import "../../css/Navbar.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      username: "new user",
      query: "",
    };
  }
  componentDidMount() {
    this.setState({ username: this.props.username }, () => {
      console.log("state name:", this.state.username);
    });
  }
  getQuery = (event) => {
    this.setState({ query: event.target.value }, () => console.log(this.state));
  };
  searchCakes = (event) => {
    event.preventDefault();
    var url = "/search?cakeQuery=" + this.state.query;
    this.props.history.push(url);
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light sticky-top nav">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand">
            My Cake Shop <Cake />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              style={{ color: "white" }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {this.props.isLoggedIn && (
                <li className="nav-item">
                  <Link to="/cart" className="nav-link" aria-current="page">
                    Cart
                  </Link>
                </li>
              )}
              {this.props.isLoggedIn && (
                <li className="nav-item">
                  <Link to="/orders" className="nav-link" aria-current="page">
                    Orders
                  </Link>
                </li>
              )}
              {this.props.isLoggedIn && (
                <div>
                  <li className="nav-item">
                    <Link
                      to="/product"
                      className="nav-link"
                      aria-current="page"
                    >
                      Add Cake
                    </Link>
                  </li>
                </div>
              )}

              {!this.props.isLoggedIn && (
                <div>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page">
                      Login
                    </Link>
                  </li>
                </div>
              )}
              {this.props.isLoggedIn && (
                <div onClick={this.props.logOut}>
                  <li className="nav-item">
                    <Link to="/home" className="nav-link" aria-current="page">
                      Logout
                    </Link>
                  </li>
                </div>
              )}
              {!this.props.isLoggedIn && (
                <div>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link" aria-current="page">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </ul>
            <p className="nav__user">Hello {this.props.username}!</p>
            <form className="d-flex">
              <input
                className="form-control me-2"
                id="searchQuery"
                type="search"
                placeholder="Search cakes"
                aria-label="Search"
                onChange={this.getQuery}
              />
              <button
                className="btn btn-light"
                disabled={this.state.query === ""}
                onClick={this.searchCakes}
                type="submit"
              >
                <Search />
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
var NavbarWithRouter = withRouter(Navbar);
export default connect(function (state) {
  return {
    isLoggedIn: state["isloggedin"],
    username: state["username"],
  };
})(NavbarWithRouter);
