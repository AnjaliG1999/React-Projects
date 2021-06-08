import React, { useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { Cake, Search } from "@material-ui/icons";
import { useStateValue } from "../../stateMgmt/StateProvider";

import "../../css/Navbar.css";

const Navbar = () => {
  const [{ user, query }, dispatch] = useStateValue();

  const history = useHistory();

  useEffect(() => {
    if (localStorage.token) {
      dispatch({
        type: "SET_USER",
        user: localStorage.name,
      });
    } else {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  }, []);

  const getQuery = (event) => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      query: event.target.value,
    });
  };
  const searchCakes = (event) => {
    event.preventDefault();
    var url = "/search?cakeQuery=" + query;
    history.push(url);
  };
  const logOut = () => {
    localStorage.clear();
    dispatch({
      type: "SET_USER",
      user: null,
    });
  };

  return (
    <div>
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
                  className="nav-link active nav__link"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link
                    to="/cart"
                    className="nav-link nav__link"
                    aria-current="page"
                  >
                    Cart
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link
                    to="/orders"
                    className="nav-link nav__link"
                    aria-current="page"
                  >
                    Orders
                  </Link>
                </li>
              )}
              {user && (
                <div>
                  <li className="nav-item">
                    <Link
                      to="/product"
                      className="nav-link nav__link"
                      aria-current="page"
                    >
                      Add Cake
                    </Link>
                  </li>
                </div>
              )}

              {!user && (
                <div>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link nav__link"
                      aria-current="page"
                    >
                      Login
                    </Link>
                  </li>
                </div>
              )}
              {user && (
                <div onClick={logOut}>
                  <li className="nav-item">
                    <Link
                      to="/home"
                      className="nav-link nav__link"
                      aria-current="page"
                    >
                      Logout
                    </Link>
                  </li>
                </div>
              )}
              {!user && (
                <div>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-link nav__link"
                      aria-current="page"
                    >
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </ul>
            <p className="nav__user">Hello {user ? user : "Guest"}!</p>
            <form className="d-flex">
              <input
                className="form-control me-2"
                id="searchQuery"
                type="search"
                placeholder="Search cakes"
                aria-label="Search"
                onChange={getQuery}
              />
              <button
                className="btn btn-light"
                disabled={query === ""}
                onClick={searchCakes}
                type="submit"
              >
                <Search />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
