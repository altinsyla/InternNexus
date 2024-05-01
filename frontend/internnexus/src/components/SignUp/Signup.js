import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../SignUp/Signup.css';

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
      <div className="mainDiv">
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
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="formInputs datepicker"
            placeholderText="Birth Date"
          />
        </form>
        <Button className="butoniNext">Next</Button>

      </div>

    </>
  );
}

export default Signup;
