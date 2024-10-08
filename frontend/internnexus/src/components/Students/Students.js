import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api.js";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import AltinSyla from "../Students/AltinSyla.jpg";
import "../Students/Students.scss";

// boni me props
// marginen te student search
// bone responsive

function Students() {
  const { username } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${username}`);

        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("Failed to fetch user info!");
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div className="studentcontainer">
      <NavBar />
      {user ? (
        <>
          <div className="utilitycontainer studentbanner">
            <div className="studentbannerleftside">
              <div className="studentUsername">
                <h2 style={{ fontFamily: "poppins_bold", marginBottom: 0 }}>
                  {user.fullname}
                </h2>
                <h6 className="fontregular">{user.username}</h6>
              </div>
              <h4
                className="fontregular"
                style={{
                  marginTop: "4rem",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid black",
                  width: "fit-content",
                }}
              >
                About Me
              </h4>
              <p className="fontthin">{user.about}</p>
            </div>

            <div className="studentbannerrightside">
              <img
                src={`https://internnexus.onrender.com/userimages/${user.image}`}
                alt="studentPhoto"
                className="studentPhoto"
              />
            </div>
          </div>
          <div className="studentskillscontainer utilitycontainer">
            <h4
              className="fontregular"
              style={{
                marginTop: "4rem",
                borderBottom: "1px solid black",
                width: "fit-content",
              }}
            >
              Skills
            </h4>
            <table className="skillstable">
              <tr>
                {user.skills?.map((skill) => (
                  <td key={skill._id}>{skill.skillName}</td>
                ))}
              </tr>
            </table>
          </div>
          <div className="studenteducationscontainer utilitycontainer">
            <h4
              className="fontregular"
              style={{
                marginTop: "10rem",
                borderBottom: "1px solid black",
                width: "fit-content",
              }}
            >
              Education
            </h4>
            <table className="educationstable">
              <tr>
                <th>University</th>
              </tr>
              {user.university?.map((skill) => (
                <tr key={skill._id} className="fontthin">
                  {skill}
                </tr>
              ))}
            </table>

            <table className="educationstable">
              <tr>
                <th>High School</th>
              </tr>
              {user.highschool?.map((skill) => (
                <tr key={skill._id} className="fontthin">
                  {skill}
                </tr>
              ))}
            </table>

            <table className="educationstable">
              <tr>
                <th>Courses</th>
              </tr>
              {user.courses?.map((skill) => (
                <tr key={skill._id} className="fontthin">
                  {skill}
                </tr>
              ))}
            </table>
          </div>
        </>
      ) : (
        <div style={{marginLeft: '80px'}}> User does not exist!</div>
      )}
      <Footer />
    </div>
  );
}

export default Students;
