import React, { useState, useEffect } from "react";
import axios from "axios";
import { SiFacebook } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import internnexus from "../imgsrc/internnexus.png";
import "../styles/App.css";
import api from "../api";
import Swal from "sweetalert2";

const Login = () => {
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // history.push("/");
      }
    };
    checkLogin();
  }, []);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/user/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      setToken(response.data.token);
      history.push("/");

      Toast.fire({
        icon: "success",
        title: "Logged in successfully",
      });
    } catch (error) {
      console.log("Login Error");
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      history.push("/");
      Swal.fire("You are already logged in!");
    }
  }, []);

  const fontiPerTekste = "robot-font";

  return (
    <div>
      <div className="mainDivLogin">
        <img src={internnexus} alt="Logo" className="logo" />
        <p
          style={{
            fontWeight: "bold",
            fontFamily: fontiPerTekste,
            fontSize: 30,
          }}
        >
          Log in to InternNexus
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            className="Inputs"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="Inputs"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="loginBtn">
            Log In
          </button>
        </form>
        <div className="forgotPasswordDiv">
          <a href="#" className="signuptext">
            Forgot password?
          </a>
          <a
            href="#"
            className="signuptext"
            onClick={() => history.push("/signupform")}
          >
            Sign Up to InternNexus
          </a>
        </div>
        <div className="btn-google-fb">
          <button className="googlebtn">
            <FcGoogle className="googleicon" />
            Login with Google
          </button>
          <button className="facebookbtn">
            <SiFacebook className="fbicon" />
            Login With Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
