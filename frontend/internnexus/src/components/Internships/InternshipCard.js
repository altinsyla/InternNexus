import React from "react";
import "../Internships/InternshipCard.scss";

function InternshipCard({ title, type, location, image }) {
  return (
    <div className="card_body">
      <img src={image} alt="Company Logo" className="company_logo" />
      <div className="positionInfo">
        <p className="companyName fontbold">{title}</p>
        <p className="companyName fontregular">{type}</p>
        <p className="locationName fontregular">{location}</p>
      </div>
    </div>
  );
}

export default InternshipCard;
