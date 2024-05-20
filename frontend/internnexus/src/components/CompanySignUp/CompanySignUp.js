import React from "react";
import { Button } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "./companySignUp.scss";
import { Link } from "react-router-dom";

function CompanySignUp() {
  return (
    <>
      <div className="complogodiv">
        <img
          src={require("../../../src/imgsrc/internnexus.png")}
          alt="logo1"
          className="c-logo-company"
        />
      </div>
      <div className="c-signup-maindiv">
        <div className="c-signupformdiv">
          <form className="c-forms">
            <p className="c-firstP">Sign Up as Company</p>
            <input
              type="text"
              placeholder="Company Name"
              className="c-formInputs"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="c-formInputs"
            />
            <input
              type="password"
              placeholder="Password"
              className="c-formInputs"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="c-formInputs"
            />
          </form>
        </div>
        <div className="c-second-div">
          <button className="c-signupbutton">Sign Up</button>
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
