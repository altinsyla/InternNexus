import React from "react";
import "../Internships/InternshipCard.scss";
import xponent from "../../components/Internships/img/xponent.jpg";

function InternshipCard() {
  return (
    <div className="card_body">
      <img src={xponent} alt="xponentlogo" className="company_logo" />
      <div className="positionInfo">
        <p className="companyName fontbold">Front-End Developer</p>
        <p className="companyName fontregular">Full-time</p>
        <p className="locationName fontregular">Prishtina</p>
      </div>
    </div>
  );
}

export default InternshipCard;
