import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../src/api";
import "../SignUpForm/SignUpForm.scss";

function CompanySignUp() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    confirmpassword: "",
    role: 1,
  });

  const [bg, setbg] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (info.password === info.confirmpassword) {
      try {
        await api
          .post("/user", info)
          .then((response) => {
            Swal.fire({
              title: "Account created successfully!",
              icon: "success",
            });
            history.push("/login");
          })
          .catch((err) => {
            Swal.fire({
              title: err.response.data.message,
              icon: "error",
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: 'Passwords do not match',
        icon: "error",
      });
    }
  };

  return (
    <>
      <Link to="/">
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
            <div style={{ display: "flex", gap: "0.5rem" }}>
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
                onChange={(e) =>
                  setInfo({ ...info, confirmpassword: e.target.value })
                }
                // value={password}
                // onChange={handlePasswordChange}
              />
            </div>
            {/* <ToggleButtonGroup
              type="radio"
              name="options"
              style={{ width: "100%" }}
              defaultValue={1}
            >
              <ToggleButton
                id="tbg-radio-1"
                value={1}
                variant="outline-dark"
                className="c-formInputs"
              >
                Name
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                value={2}
                variant="outline-dark"
                className="c-formInputs"
              >
                Username
              </ToggleButton>
            </ToggleButtonGroup> */}
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
