import React from "react";
import "./StudentCard.scss";

function StudentCard({ profilePic, fullName, username, skills, key }) {
  return (
    <div className="studentcard-body container" key={key}>
      <img src={profilePic} alt="Company Logo" />
      <div className="student-card-content">
        <h3 className="fullName">{fullName}</h3>
        <h6 className="userName">{username}</h6>
        <div className="skillsContainer">
          {skills.map((number) => (
            <span className="skills">{number}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default StudentCard;
