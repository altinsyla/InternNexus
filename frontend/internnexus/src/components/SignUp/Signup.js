import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
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
      <div className="signupformdiv">
        <form className="forms">
          <p className="firstP">Create Students Account</p>
          <input type="text" placeholder="Name" className="formInputs" />
          <input type="tel" placeholder="Phone Number" className="formInputs" />
          <input type="email" placeholder="Email" className="formInputs" />
          <input
            type="password"
            placeholder="Password"
            className="formInputs"
          />
          <p className="secondP">Date of Birth</p>
          <div className="datepickerdiv">
            {/* <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="datepicker"
              placeholderText="Birth Date"
            /> */}
            <input type="date" id="date" className="datepicker formInputs" ></input>
          </div>
        </form>
        <Button className="signupbutton">Next</Button>
      </div>
    </>
  );
}

export default Signup;
