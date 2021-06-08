import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios";
import { handleEmail, handlePassword } from "./handleValidation";

import "../../css/Form.css";

const Signup = () => {
  const history = useHistory();

  if (localStorage.token) {
    alert("You are logged in, log out to sign up with new credentials");
    history.push("/");
  }

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPw, setErrorPw] = useState(null);
  const [errorName, setErrorName] = useState(null);

  useEffect(() => {}, [errorEmail, errorPw, errorName]);

  const setData = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const userName = elements["inputName"].value;
    const userEmail = elements["inputEmail"].value;
    const userPassword = elements["inputPassword"].value;

    const emailValid = handleEmail(userEmail);
    const passwordValid = handlePassword(userPassword);

    if (emailValid.errorEmail) {
      setErrorEmail(emailValid.errorEmail);
    } else {
      setErrorEmail(null);
    }

    if (passwordValid.errorPw) {
      setErrorPw(passwordValid.errorPw);
    } else {
      setErrorPw(null);
    }
    if (!userName) {
      setErrorName("Enter Name");
    } else {
      setErrorName(null);
    }

    if (!emailValid.errorEmail && !passwordValid.errorPw && userName) {
      setErrorEmail(null);
      setErrorPw(null);
      setErrorName(null);
      handleSubmit(userEmail, userPassword, userName);
    }
  };

  const handleSubmit = (userEmail, userPassword, userName) => {
    let userData = {};
    userData["email"] = userEmail;
    userData["password"] = userPassword;
    userData["name"] = userName;

    axios.post("/api/register", userData).then(
      (response) => {
        // console.log("signup", response.data);
        const msg = response.data.message;
        if (response.status === 200) toast.error(msg);
        else if (response.status === 201) toast.success(msg);
      },
      (error) => {
        toast.error(error.data);
      }
    );
  };
  return (
    <div className="container row login">
      <h2>Register</h2>
      <form className="g-3" onSubmit={setData}>
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="inputEmail"
            id="inputEmail"
            placeholder="Enter your email (required)"
          />
          <small className="text-danger">{errorEmail}</small>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="inputPassword"
            id="inputPassword"
            placeholder="Enter your password (required)"
          />
          <small className="text-danger">{errorPw}</small>
        </div>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="inputName"
            id="inputName"
            placeholder="Enter your name (required)"
          />
          <small className="text-danger">{errorName}</small>
        </div>
        <br />
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Sign up
          </button>
        </div>
      </form>
      <small className="login__member">
        Already a user?
        <br />
        Login <Link to="/login">here</Link>
      </small>
    </div>
  );
};

export default Signup;
