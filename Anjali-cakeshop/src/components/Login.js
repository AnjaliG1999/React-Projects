import axios from "axios";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import {connect} from 'react-redux';

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

class Login extends Component {
    constructor() {
        super()
        this.state = {
            errorPw: null,
            errorEmail: null,
            email: null,
            password: null
        }
    }
    componentDidMount(){
        if(localStorage.token){
            alert("You already logged in")
            this.props.history.push('/');
        }
    }
    handleEmail = (event) => {
        const email = event.target.value;
        if (!email) {
            this.setState({ errorEmail: "Enter email" })
        } else if (!validateEmail(email))
        this.setState({ errorEmail: "Enter valid email" })
        else {
            this.setState({
                errorEmail: "",
                email: email
            })
            console.log(this.state);
        }
    }
    handlePassword = (event) => {
        const password = event.target.value;
        if (!password)
            this.setState({ errorPw: "Password is required" })
        else if (!validatePassword(password))
            this.setState({ errorPw: "Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" })
        else {
            this.setState({
                errorPw: "",
                password: password
            })
            console.log(this.state);
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        const userEmail = elements["loginEmail"].value;
        const userPassword = elements["loginPassword"].value;

        if (!userEmail) {
            this.setState({ errorEmail: "Enter email" })
        }
        if (!userPassword) {
            this.setState({ errorPw: "Enter password" })
        }
        console.log(this.state);
        axios({
            url: "https://apibyashu.herokuapp.com/api/login",
            method: "post",
            data: {email:userEmail, password:userPassword}
        }).then((response)=>{
            if(response.data.token){
                localStorage.token = response.data.token
                localStorage.name = response.data.name
                localStorage.email = response.data.email
                this.props.dispatch({
                    type: "LOGIN"
                })
                // this.props.loginDone(response.data.name)
                this.props.history.push('/home');
            } else{
                toast.error("Invalid credentials")
            }
        }, (error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div className="container row">
                <div style={{width:"450px"}}></div>
                <div className="formDiv">
                    <h2>Login</h2>
                    <form className="g-3" onSubmit={this.handleSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="loginEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" onChange={this.handleEmail} name="loginEmail" id="loginEmail" placeholder="Enter your email (required)" />
                            <div className="text-danger">{this.state.errorEmail}</div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="loginPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={this.handlePassword} name="loginPassword" id="loginPassword" placeholder="Enter your password (required)" />
                            <div className="text-danger">{this.state.errorPw}</div>
                        </div>
                        <br />
                        <div className="col-12">
                            <button type="submit" name="loginButton" className="btn btn-primary w-100">Sign in</button>
                        </div>
                    </form>
                    <p className="member1">Not a user? Sign up <Link to="/signup">here</Link>
                    <br /><Link to="/forgot">Forgot password</Link></p>
                </div>
            </div>
        )
    }
}
var LoginWithRouter = withRouter(Login) // hmesha dusre var m dalna if with router h to
export default connect() (LoginWithRouter);