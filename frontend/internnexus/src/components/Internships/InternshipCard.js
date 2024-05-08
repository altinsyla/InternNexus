import React from "react";
import "../Internships/InternshipCard.scss";

function InternshipCard({ title, type, location, image, key }) {
  return (
    <div className="internshipcard_body" key={key}>
      <img src={image} alt="Company Logo" className="company_logo" />
      <div className="positionInfo">
        <p className="companyName">{title}</p>
        <p className="companyType">{type}</p>
        <p className="locationName">{location}</p>
      </div>
    </div>
  );
}

export default InternshipCard;