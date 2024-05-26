import React from "react";
import "../Internships/InternshipCard.scss";
import { useHistory } from "react-router-dom";

function InternshipCard({ _id, title, type, location, image }) {
  const history = useHistory();

  const handleInternship = () => {
    history.push(`/apply/${_id}`);
  }

  return (
    <div className="internshipcard_body" onClick={handleInternship}>
      <img src={`http://localhost:5001/images/${image}`} alt="Company Logo" className="company_logo" />
      <div className="positionInfo">
        <p className="companyName">{title}</p>
        <p className="companyType">{type}</p>
        <p className="locationName">{location}</p>
      </div>
    </div>
  );
}

export default InternshipCard;
