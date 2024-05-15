import React from "react";
import "../../components/InternshipApply/InternshipApply.scss";
import starlabs from "../InternshipApply/starlabs.png";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";

function InternshipApply() {
  // const handleApplyNow = () => {
  //   const email = 'internship@starlabs.com'; // Change this to your desired email address
  //   const subject = 'Internship Application - UI/UX Designer'; // Subject line
  //   // const body = 'Dear Hiring Team,\n\nI am writing to express my interest in the UI/UX Designer internship at Starlabs. Please find attached my resume and cover letter.\n\nSincerely,\n[Your Name]'; // Email body

  //   const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}}`;
  //   window.location.href = mailToLink;
  // };

  return (
    <div>
      <NavBar />
      <div className="applymainContainer">
        <div className="applyCard">
          <img src={starlabs} alt="starlabs" className="applycompanyLogo" />
          <div className="specifications">
            <h2 className="fontbold" style={{ backgroundColor: "#FEF8F8" }}>
              UI/UX Designer
            </h2>
            <h5 className="fontregular" style={{ backgroundColor: "#FEF8F8" }}>
              <strong>Location: </strong> Prishtine
            </h5>
            <h5 className="fontregular" style={{ backgroundColor: "#FEF8F8" }}>
              <strong>Type:</strong> Full time
            </h5>
            <h5 className="fontregular" style={{ backgroundColor: "#FEF8F8" }}>
              <strong>Duration:</strong> 6 months
            </h5>
            <button className="btn-apply">Apply Now</button>
          </div>
        </div>
        <div className="intapplydescription">
          <p className="int-requirements"
          >
            Internship Requirements
          </p>
          <p>
            ❖ Strong interest in UI/UX design and its implementation for
            e-commerce platforms{" "}
          </p>
          <p>
            ❖ Willingness to learn more about design frameworks and tools such
            as Sketch, Figma, or Adobe XD
          </p>
          <p>
            ❖ Excellent problem-solving skills and attention to detail Interest
            in conducting user research and usability testing to improve user
            experience
          </p>
        </div>
        <div className="intapplydescription">
          <p className="int-requirements"
          >
            What we offer
          </p>
          <p>
            ❖ A comprehensive onboarding process to integrate you seamlessly
            into our team
          </p>
          <p>
            ❖ A supportive role within our agile development team, focusing on
            e-commerce solutions
          </p>
          <p>
            ❖ A collaborative and innovative working environment with a flat
            organizational structure 
          </p>
          <p>
            ❖ Direct client engagement opportunities,
            especially with our clients in Germany
          </p>
          <p>
            ❖ A modern office in the heart of Prishtina, including free drinks
            and fruit
          </p>
          <p>
            ❖ Regular team-building events to ensure a strong, cohesive
            team Health insurance coverage
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipApply;
