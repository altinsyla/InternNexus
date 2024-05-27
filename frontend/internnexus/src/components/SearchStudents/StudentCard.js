import "./StudentCard.scss";
import React, { useEffect, useState } from "react";
import api from "../../api";

function StudentCard({ profilePic, fullName, username, skills, key }) {
  const [users, setUsers] = useState({
    username: "",
    fullname: "",
  });

  const getUsers = async () => {
    try {
      const response = await api.get("/user/");
      setUsers({
        username: response.data.username,
        fullname: response.data.fullname,
      });
    } catch (error) {
      console.error("Error fetching internship data", error);
    }

    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // const formatUsers = () => {
  //   return (
  //     <ul>
  //       {users.map((e) => (
  //         <li key={index}>❖ {item.trim()}</li>
  //       ))}
  //     </ul>
  //   );
  // };

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
