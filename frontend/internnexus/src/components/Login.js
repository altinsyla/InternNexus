import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";
import internnexus from "../imgsrc/internnexus.png";
import "../styles/App.css";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setcurrentUser] = useState("");
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
      
      // Qitu i rujm tokenin, usernamen edhe rolin nlocalstorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      setToken(response.data.token);
  
      if (response.data.role === 3) {
        history.push('/admindashboard');
      } else if (response.data.role === 1 || response.data.role === 2) {
        history.push('/');
      }

      Toast.fire({
        icon: "success",
        title: "Logged in successfully",
        timer: 1000,
      });
      
    } catch (error) {
      Swal.fire({
        title: "Email or password is incorrect!",
        icon: "error",
      });
      console.log(error);
    }
  };
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
      Swal.fire("You are already logged in!");
    }
  }, []);

  return (
    <div>
      <div className="mainDivLogin">
        <img
          src={internnexus}
          alt="Logo"
          className="logo"
          onClick={() => history.push("/")}
        />
        <p
          style={{
            fontSize: "26px",

            marginTop: "2rem",
          }}
          className="fontbold"
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
