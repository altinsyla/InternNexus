import React from "react";
import "../Internships/InternshipCard.scss";
import { useHistory } from "react-router-dom";

function InternshipCard({ _id, title, type, location, image, registeredDate, category }) {
  const history = useHistory();

  const handleInternship = () => {
    history.push(`/apply/${_id}`);
  }

  return (
    <div className="internshipcard_body" onClick={handleInternship}>
      <img src={`https://internnexus.onrender.com/images/${image}`} alt="Company Logo" className="company_logo" />
      <div className="positionInfo">
        <p className="companyName">{title}</p>
        <p className="categoryType">{category}</p>
        <p className="companyType">{type}</p>
        <p className="locationName">📍 {location}</p>
        <p className="registered-date"><strong>Published on: </strong>{new Date(registeredDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
}

export default InternshipCard;
