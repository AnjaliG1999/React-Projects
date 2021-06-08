import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios";
import { validateEmail, validatePassword } from "./validate";
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

  const handleErrors = (event) => {
    let errors = {};
    const elements = event.target.elements;
    const userName = elements["inputName"].value;
    const userEmail = elements["inputEmail"].value;
    const userPassword = elements["inputPassword"].value;

    // if (!userEmail) errors["email"] = "Email is required";
    // else if (!validateEmail(userEmail)) errors["email"] = "Enter valid email";
    // if (!userPassword) errors["password"] = "Password is required";
    // else if (!validatePassword(userPassword))
    //   errors["password"] =
    //     "Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    // if (!userName) errors["name"] = "Name is required";
    // else {
    //   handleSubmit(userEmail, userPassword, userName);
    // }
    // setState({
    //   errors: errors,
    // });
  };

  const setData = (event) => {
    event.preventDefault();
    // setState({
    //   errors: {},
    // });
    handleErrors(event);
  };

  const handleSubmit = (userEmail, userPassword, userName) => {
    let userData = {};
    userData["email"] = userEmail;
    userData["password"] = userPassword;
    userData["name"] = userName;

    // setState({ userData: userData });

    axios.post("/api/register", userData).then(
      (response) => {
        // console.log("signup", response.data);
        const msg = response.data.message;
        if (response.status === 200) toast.error(msg);
        else if (response.status === 201) toast.success(msg);
      },
      (error) => {
        toast.error(error.data.message);
        // console.log("error:", error);
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
          {/* <div className="text-danger">{state.errors.email}</div> */}
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
          {/* <div className="text-danger">{state.errors.password}</div> */}
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
          {/* <div className="text-danger">{state.errors.name}</div> */}
        </div>
        <br />
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Sign up
          </button>
        </div>
      </form>
      <br />
      <p className="member">
        Already a user?
        <br />
        Login <Link to="/login">here</Link>
      </p>
    </div>
  );
};

export default Signup;
