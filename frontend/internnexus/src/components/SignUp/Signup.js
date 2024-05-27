import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../SignUp/Signup.css";
import { Link, useHistory } from "react-router-dom";
import api from "../../../src/api";

function Signup() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
  });

  const history = useHistory();

  const handleSubmit = async (event) => {
    alert('Hello');
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", info.username);
    formData.append("email", info.email);
    formData.append("fullname", info.fullname);
    formData.append("password", info.password);

    try {
      const response = await api.post("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Account created successfully");
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const sendAlert = () =>{
    alert("Button is working");
  }
      
  return (
    <>
      <div className="logoDiv">
        <img
          src={require("../../../src/imgsrc/internnexus.png")}
          alt="logo1"
          className="logo1"
          // onClick={history.push("/home")}
        />
      </div>
      <div className="main-div">
        <div className="signupformdiv">
          <form className="forms">
            <p className="firstP">Sign Up as Student</p>
            <input
              type="text"
              placeholder="Username"
              className="formInputs"
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="formInputs"
              onChange={(e) => setInfo({ ...info, fullname: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="formInputs"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="formInputs"
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="formInputs"
            />
          </form>
        </div>
        <div className="second-main-div">
          <button className="signupbutton" onClick={sendAlert} type="submit">
            Sign Up
          </button>
          <p>
            Already have an Account?{" "}
            <span>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Log In
              </Link>
            </span>
          </p>
          <p>
            <Link
              to="/signupcompany"
              style={{ textDecoration: "none", color: "black" }}
            >
              Sign up as <span>Company</span>{" "}
            </Link>
          </p>
          <h5>Or</h5>
          <Button className="sign-google">
            <FaGoogle className="g-icon" />
            <span> Sign up with Google</span>
          </Button>
          <Button className="sign-facebook">
            <FaFacebook className="g-icon" />
            <span> Sign up with Facebook</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Signup;
