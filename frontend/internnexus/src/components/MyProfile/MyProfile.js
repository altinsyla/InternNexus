import React from "react";
import internnexus from "../../imgsrc/internnexus.png";
import "./MyProfile.scss";

function MyProfile() {
  return (
    <div className="main-Div">
      <div className="left-elements">
        <img className="logo1" src={internnexus} />
        <div className="foto-Profilit"></div>
        <p className="first-P">Flamur Isa</p>
        <p className="second-P">Front End Developer</p>
        <div className="left-info">
            <div className="info-text">
            <p>Age: 21</p>
            <p>Job: Intern</p>
            <p>Location: Vushtrri</p>
            </div>
            <div className="info-skills">
               <div className="skill-element">HTML</div>
               <div className="skill-element">Css</div>
               <div className="skill-element">JavaScript</div>
               <div className="skill-element">ReactJs</div>
            </div>
        </div>
      </div>
      <div className="right-elements">
      <form className="format">
          <p className="firstP">Name:</p>
          <input type="text" placeholder="Name" className="formInputs" />
          <p className="firstP">Number:</p>
          <input type="tel" placeholder="Phone Number" className="formInputs" />
          <p className="firstP">Email:</p>
          <input type="email" placeholder="Email" className="formInputs" />
          <p className="firstP">Password:</p>

          <input
            type="password"
            placeholder="Password"
            className="formInputs"
          />
          </form>
          <p className="firstP">Description:</p>

          <textarea placeholder="Description..." className="skill-description"></textarea>
      <button className='loginButton'>Log In</button>

      </div>

    </div>
  );
}

export default MyProfile;
