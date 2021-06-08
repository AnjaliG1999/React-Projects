import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateValue } from "../../stateMgmt/StateProvider";

import axios from "../../axios";
import { handleEmail, handlePassword } from "./handleValidation";

import "../../css/Form.css";

const Login = () => {
  const history = useHistory();

  if (localStorage.token) {
    alert("You already logged in");
    history.push("/");
  }

  const [{}, dispatch] = useStateValue();

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPw, setErrorPw] = useState(null);

  const handleInputs = (e) => {
    const input = e.target;

    if (input.id === "loginEmail") {
      const email = handleEmail(input.value);
      if (email.errorEmail) {
        setErrorEmail(email.errorEmail);
      } else {
        setErrorEmail(null);
      }
    } else if (input.id === "loginPassword") {
      const password = handlePassword(input.value);
      if (password.errorPw) {
        setErrorPw(password.errorPw);
      } else {
        setErrorPw(null);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const userEmail = elements["loginEmail"].value;
    const userPassword = elements["loginPassword"].value;

    if (handleEmail(userEmail).errorEmail) {
      setErrorEmail("Invalid email");
    }
    if (handlePassword(userPassword).errorPw) {
      setErrorPw("Invalid password");
    } else {
      axios
        .post("/api/login", { email: userEmail, password: userPassword })
        .then(
          (response) => {
            // console.log("login", response.data);
            if (response.data.token) {
              localStorage.token = response.data.token;
              localStorage.name = response.data.name;

              dispatch({
                type: "SET_USER",
                user: response.data.name,
              });
            } else {
              toast.error("Invalid credentials");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      history.push("/home");
    }
  };
  return (
    <div className="container row login">
      <h2>Login</h2>
      <form className="g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="loginEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            onChange={handleInputs}
            name="loginEmail"
            id="loginEmail"
            placeholder="Enter your email (required)"
          />
          <small className="text-danger">{errorEmail}</small>
        </div>
        <div className="col-md-12">
          <label htmlFor="loginPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={handleInputs}
            name="loginPassword"
            id="loginPassword"
            placeholder="Enter your password (required)"
          />
          <small className="text-danger">{errorPw}</small>
        </div>
        <br />
        <div className="col-12">
          <button
            type="submit"
            name="loginButton"
            className="btn btn-primary w-100"
          >
            Sign in
          </button>
        </div>
      </form>
      <small className="login__member">
        Not a user? Sign up <Link to="/signup">here</Link>
        <br />
        <Link to="/forgot">Forgot password</Link>
      </small>
    </div>
  );
};

export default Login;
