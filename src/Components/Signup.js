import React, { Component } from "react";
import "../css/newSignup.css";
import axios from "axios";
import Navbar from "../Components/Navbar";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      info: "",
    };
  }
  submit = () => {
    this.setState({
      info: "",
    });
    // console.log("Inside Submit");
    // console.log(this.state);
    const payload = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      number: document.getElementById("number").value,
      password: document.getElementById("password").value,
      cpassword: document.getElementById("cpassword").value,
    };
    // console.log(payload.username)
    axios({
      url: "https://lost-backend-3lwz.onrender.com/signup",
      method: "POST",
      data: payload,
    })
      .then((response) => {
        // console.log("Response is :", response);
        this.setState({
          info: response.data,
        });
        // console.log("Data has been sent")
        if (response.data === "Done") {
          this.props.history.push("/feed");
        }
      })
      .catch(() => {
        console.log("Error occured");
      });
  };
  render() {
    // console.log("State is :"+ this.state)
    return (
      <>
        <Navbar />

        <div>
          <form className="Box-1">
            <h1 className="name">Sign up</h1>
            <p style={{ color: "white" }}>{this.state.info}</p>
            <div className="row1">
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </div>
            <div className="row1">
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
              <input
                type="number"
                id="number"
                placeholder="Phone Number"
                required
                onChange={(e) => {
                  this.setState({ number: e.target.value });
                }}
              />
            </div>
            {/* <input type="text" name="username" id='username' placeholder="User Name" required onChange={(e)=>{this.setState({username:e.target.value})}} /> */}
            <div className="row1">
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="cpassword"
                name="cpassword"
                required
                onChange={(e) => {
                  this.setState({ cpassword: e.target.value });
                }}
              />
            </div>
            <button type="button" className="submit" onClick={this.submit}>
              Submit
            </button>
            <p style={{ color: "white" }}>
              Have an account?{" "}
              <a style={{ color: "cyan" }} href="/log-in">
                Click here
              </a>
            </p>
          </form>
        </div>
        {}
      </>
    );
  }
}
