import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../SignUpForm/SignUpForm.scss";
import { Link, useHistory } from "react-router-dom";
import api from "../../../src/api";
import cors from "cors";

function CompanySignUp() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    role: 1,
  });

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api
        .post("/user", info)
        .then((response) => {
          alert("Account created successfully");
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Link to='/'>
      <div className="complogodiv">
        <img
          src={require("../../../src/imgsrc/internnexus.png")}
          alt="logo1"
          className="c-logo-company"
        />
      </div>
      </Link>
      <div className="c-signup-maindiv">
        <div className="c-signupformdiv">
          <form className="c-forms">
            <p className="c-firstP">Sign Up to InternNexus</p>
            <input
              type="text"
              placeholder="Username"
              className="c-formInputs"
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
              // value={name}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="c-formInputs"
              onChange={(e) => setInfo({ ...info, fullname: e.target.value })}
              // value={name}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="c-formInputs"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              // value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="c-formInputs"
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
              // value={password}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="c-formInputs"
              // value={password}
              // onChange={handlePasswordChange}
            />
          </form>
        </div>
        <div className="c-second-div">
          <button
            className="c-signupbutton"
            onClick={handleSubmit}
            type="submit"
          >
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
          <h5>Or</h5>
          <Button className="c-sign-google">
            <FaGoogle className="c-g-icon" />
            <span> Sign up with Google</span>
          </Button>
          <Button className="c-sign-facebook">
            <FaFacebook className="c-g-icon" />
            <span> Sign up with Facebook</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default CompanySignUp;