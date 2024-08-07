import React, { useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Spinner } from "react-bootstrap";
// import developer from "../img/developer_outline I.svg";

// export default let [user,setUser]=useState(false)

function Login() {
  const [loading, setloading] = useState(false);
  let [info, setinfo] = useState("");
  const [user_info, setuser_info] = useState("");
  const history = useHistory();
  function login() {
    setloading(true);
    // console.log(setinfo)
    var payload = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    axios({
      url: "https://lost-backend-3lwz.onrender.com/login",
      method: "POST",
      data: payload,

      // url: "https://lost-backend-3lwz.onrender.com/login"
    })
      .then((response) => {
        console.log("Response is :", response);
        if (response.data.user) {
          //Authentication done.
          setuser_info(response.data.user);
          localStorage.setItem("token", response.data.jwt_token);
          // console.log(response.data.user)
          localStorage.setItem("user", JSON.stringify(response.data.user));
          history.push({ pathname: "/feed", user: response.data.user });
        } else {
          setinfo(response.data);
        }
        // console.log("Response :",response)
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
        console.log("Error occured");
      });
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* <img
          src={developer}
          style={{ width: "500px", height: "500px" }}
          alt=""
        /> */}
        <form className="Box-1 login">
          <h1>Log in</h1>
          <p style={{ color: "white" }}>{info}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email id"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
          {/* <input type="submit" placeholder="Submit"></input> */}
          <button type="button" className="submit" onClick={login}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <a style={{ color: "cyan" }} href="/sign-up">
              Click here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
