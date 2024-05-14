import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../SignUp/Signup.css";



function Signup() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="logoDiv">
        <img
          src={require("../../../src/imgsrc/internnexus.png")}
          alt="logo1"
          className="logo1"
        />
      </div>
      <div className="main-div">
      <div className="signupformdiv">
        <form className="forms">
          <p className="firstP">Sign Up as Student</p>
          <input type="text" placeholder="Username" className="formInputs" />
          <input type="text" placeholder="Full Name" className="formInputs" />
          <input type="email" placeholder="Email Address" className="formInputs" />
          <input
            type="password"
            placeholder="Password"
            className="formInputs"
          />
           <input
            type="password"
            placeholder="Confirm Password"
            className="formInputs"
          />
       
        </form>
      </div>
      <div className="second-main-div">
      <Button className="signupbutton">Sign Up</Button>
      <p >Already have an Account? <span>Log In</span></p>
      <h5>Or</h5>
      <Button className="sign-google">  
      <FaGoogle className="g-icon"/>
       <span> Sign up with Google</span>
        </Button>
      <Button className="sign-facebook">
      <FaFacebook className="g-icon"/>
       <span> Sign up with Facebook</span>
        </Button>

      </div>
      </div>
    </>
  );
}

export default Signup;
