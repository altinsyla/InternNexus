// import React, {useState} from "react";
import { Button } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import '../SignUpForm/SignUpForm.scss';
import { Link } from "react-router-dom";
// import axios from "axios";

function CompanySignUp() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleNameChange = (event) => setName(event.target.value);
  // const handleEmailChange = (event) => setEmail(event.target.value);
  // const handlePasswordChange = (event) => setPassword(event.target.value);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Register button clicked");
  // } // e hek qita kur e hek komentimin

    //Qikjo duhet me shti te posti pathin ku ka mu postu
  //   try {
  //     const response = await axios.post("", {
  //       name,
  //       email,
  //       password,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Register error", error.response.data);
  //   }
  // };

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
            <p className="c-firstP">Sign Up to InternNexus</p>
            <input
              type="text"
              placeholder="Username"
              className="c-formInputs"
              // value={name}
              // onChange={handleNameChange}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="c-formInputs"
              // value={name}
              // onChange={handleNameChange}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="c-formInputs"
              // value={email}
              // onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="c-formInputs"
              // value={password}
              // onChange={handlePasswordChange}
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
          // onClick={handleSubmit}
          type="submit">
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
