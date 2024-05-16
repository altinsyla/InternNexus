import React from "react";
import "../Internships/InternshipCard.scss";
import { useHistory } from "react-router-dom";

function InternshipCard({ title, type, location, image, key }) {
  
  const history = useHistory();

  const handleInternship = () => {
    history.push("/apply");
  }

  return (
    <div className="internshipcard_body" onClick={handleInternship} key={key}>
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