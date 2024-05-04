import React from "react";
import "../../components/InternshipApply/InternshipApply.scss";
import NavigationBar from "../NavigationBar.js";
import starlabs from "../InternshipApply/starlabs.png";
import Footer from '../Footer/Footer.js';

function InternshipApply() {
  return (
    <div className="mainContainer">
      <NavigationBar />
      <div className="applyCard">
        <img src={starlabs} alt="starlabs" className="companyLogo" />
        <div className="specifications">
          <h2 className="fontbold">UI/UX Designer</h2>
          <h5 className="fontregular">Prishtine</h5>
          <h5 className="fontregular">Full time</h5>
          <h6 className='fontregular'>Duration: 6 months</h6>
        </div>
      </div>
      <div className="description">
        <p>
          <strong>Internship Requirements:</strong>
          <br></br>
          Strong interest in UI/UX design and its implementation for e-commerce
          platforms Willingness to learn more about design frameworks and tools
          such as Sketch, Figma, or Adobe XD Excellent problem-solving skills
          and attention to detail Interest in conducting user research and
          usability testing to improve user experience
         <br></br> <strong>What We Offer:</strong><br></br>A comprehensive onboarding process to
          integrate you seamlessly into our team A supportive role within our
          agile development team, focusing on e-commerce solutions A
          collaborative and innovative working environment with a flat
          organizational structure Direct client engagement opportunities,
          especially with our clients in Germany A modern office in the heart of
          Prishtina, including free drinks and fruit Regular team-building
          events to ensure a strong, cohesive team Health insurance coverage
        </p>
      </div>
      <div className="buttonDiv">
        <button className="fontbold">APPLY</button>
      </div>
    </div>
  );
}

export default InternshipApply;
