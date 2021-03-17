import axios from "axios";
import { Component } from "react";
import { toast } from "react-toastify";

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class ResetPw extends Component{
    constructor(){
        super()
        this.state = {
            errorNew: null,
            email: null
        }
    }
    handleEmail = (event) => {
        const email = event.target.value;
        if (!email)
            this.setState({ errorNew: "Email is required" })
        else if (!validateEmail(email))
            this.setState({ errorNew: "Invalid email" })
        else {
            this.setState({
                errorNew: "",
                email: email
            })
        }

    }
    handleSubmit = (event) => {
        event.preventDefault()
        var userEmail = event.target.elements["recover"].value;
        if (!userEmail)
            this.setState({ errorNew: "Email is required" })
        if(validateEmail(userEmail)){
            axios({
                url: "https://apibyashu.herokuapp.com/api/recoverpassword",
                method: "post",
                data: {email:userEmail}
            }).then((response)=>{
                if(response.data.message === "Password Sent to your email"){
                    window.confirm("Your password is sent to your registered email id")
                    this.props.history.push('/login');
                } else {
                    toast.error(response.data.message)
                }
            }, (error)=>{
                console.log(error);
            })
        }
    }
    render(){
        return (
            <div className="container row">
                    <div style={{width:"450px"}}></div>
                    <div className="formDiv">
                        <h2>Reset Password</h2>
                        <form className="g-3" onSubmit={this.handleSubmit}>
                            <div className="col-md-12">
                                <label htmlFor="recover" className="form-label">Enter Email</label>
                                <input type="email" className="form-control" onChange={this.handleEmail} name="recover" id="recover" placeholder="Enter your email to recover your password (required)" />
                                <div className="text-danger">{this.state.errorNew}</div>
                            </div>
                            <br />
                            <div className="col-12">
                                <button type="submit" name="loginButton" className="btn btn-primary w-100">Recover Password</button>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }
}

export default ResetPw;