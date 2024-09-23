import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";
import "./StudentCard.scss";

// VERSIONI MAIN

// function StudentCard({ profilePic, fullName, username, skills, key }) {

//   return (
//     <div className="studentcard-body container" key={key}>
//       <img src={profilePic} alt="Company Logo" />
//       <div className="student-card-content">
//         <h3 className="fullName">{fullName}</h3>
//         <h6 className="userName">{username}</h6>
//         <div className="skillsContainer">
//           {skills.map((number) => (
//             <span className="skills">{number}</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// VERSIONI QE VEQ SA MEM BA

function StudentCard({ username }) {
  const [user, setUser] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${username}`);
        setUser(response.data);
      } catch (err) {
        console.log("Failed to fetch user info!");
      }
    };

    fetchUser();
  }, [username]);

  const handleLink = () => {
    history.push(`/student/${username}`);
  };

  return (
    <div className="studentcard-body container" onClick={handleLink}>
      <img src={`https://internnexus.onrender.com/userimages/${user.image}`} alt="User Profile" />
      <div className="student-card-content">
        <h3 className="fullName">{user.fullname}</h3>
        <h6 className="userName">{user.username}</h6>
        <div className="skillsContainer">
          {/* max 6 skills */}
          {user.skills?.map((user) => (
            <span className="skills" key={user._id}>
              {user.skillName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default StudentCard;
