import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import api from "../../api.js";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import AltinSyla from "./AltinSyla.jpg"
import "../MyProfile/MyProfile.scss";
import Swal from "sweetalert2";

function MyProfile() {
  const { username, id } = useParams();
  const history = useHistory();
  const [currentUser, setcurrentUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    image: null,
    fullname: "",
    email: "",
    password: "",
    courses: [],
    role: 1,
    university: [],
    highschool: [],
    skills: [],
  });

  const getcurrentUser = async () => {
    try {
      const response = await api.get(
        "/user/" + localStorage.getItem("username")
      );
      setcurrentUser(response.data);
    } catch (err) {
      console.log("Error getting custom users");
    }
  };

  useEffect(() => {
    getcurrentUser()
    if (username) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/user/${username}`);
          setUser({
            username: localStorage.getItem("username"),
            image: response.data.image,
            fullname: response.data.fullname,
            email: response.data.email,
            password: response.data.password,
            courses: response.data.courses,
            university: response.data.university,
            highschool: response.data.highschool,
            skills: response.data.skills,
          });
        } catch (err) {
          console.log("Failed to fetch user info!");
        }
      };

      const fetchData = async () => {
        if (localStorage.getItem("token")) {
          await getcurrentUser();
        }
        await fetchUser();
      };

      fetchData();
    }
  }, [username]);

  const handleFileChange = (e) => {
    setUser({ ...user, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field should be an array and handle it properly
    if (
      name === "courses" ||
      name === "university" ||
      name === "highschool" ||
      name === "skills"
    ) {
      setUser({ ...user, [name]: value.split(",").map((item) => item.trim()) });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check required fields
    if (!user.username || !user.fullname || !user.email || !user.password) {
      Swal.fire({
        title: "Error!",
        text: "All fields need to be filled!",
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    if (user.image) {
      formData.append("image", user.image);
    }
    formData.append("username", user.username);
    formData.append("fullname", user.fullname);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("role", user.role);

    user.courses.forEach(course => formData.append("courses[]", course));
    user.university.forEach(uni => formData.append("university[]", uni));
    user.highschool.forEach(school => formData.append("highschool[]", school));
    user.skills.forEach(skill => formData.append("skills[]", skill));

    try {
      await api.patch(`/user/` + currentUser._id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        text: "Internship successfully edited!",
        icon: "success",
      });

      history.push("/myprofile");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Something went wrong!",
        text: "Fields need to be filled!",
        icon: "error",
      });
    }
  };

  const formatList = (input) => {
    if (typeof input !== "string" || input.trim() === "") return "";
    const listItems = input.split("\n");
    return (
      <ul>
        {listItems.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="studentcontainer">
      <NavBar />
      <div className="utilitycontainer studentbanner">
        <div className="studentbannerleftside">
          <div className="editing-buttons">
            <button onClick={() => setShowFilterModal(true)}>Edit</button>
            <button onClick={() => console.log(currentUser)}>Check</button>
          </div>
      
          <div className="studentUsername">
            <h2 style={{ fontFamily: "poppins_bold", marginBottom: 0 }}>
              {currentUser.fullname}
            </h2>
            <h6 className="fontregular">{currentUser.username}</h6>
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
          <p className="fontthin">{currentUser.about}</p>
        </div>
      
        <div className="studentbannerrightside">
        <img
  src={`http://localhost:5001/userimages/${currentUser.image}`}
  alt="studentPhoto"
  className="imgprofilephoto"
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
          <tbody>
            <tr>
              {currentUser.skills?.map((skill) => (
                <td key={skill._id}>{skill.skillName}</td>
              ))}
            </tr>
          </tbody>
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
          <tbody>
            <tr>
              <th>University</th>
            </tr>
            {currentUser.university?.map((university, index) => (
              <tr key={index} className="fontthin">
                {university}
              </tr>
            ))}
          </tbody>
        </table>

        <table className="educationstable">
          <tbody>
            <tr>
              <th>High School</th>
            </tr>
            {currentUser.highschool?.map((highschool, index) => (
              <tr key={index} className="fontthin">
                {highschool}
              </tr>
            ))}
          </tbody>
        </table>

        <table className="educationstable">
          <tbody>
            <tr>
              <th>Courses</th>
            </tr>
            {currentUser.courses?.map((course, index) => (
              <tr key={index} className="fontthin">
                {course}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFilterModal && (
        <div className="Edit-Profile-Container">
          <form onSubmit={handleSubmit} encType="form-type">
            <p className="internshipform-details">Edit Your Profile</p>
            <div className="form-group">
              <input
                type="file"
                className="internshipform-inputs"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Change Username</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="username"
                placeholder="Change your username"
                value={user.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Change Fullname</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="fullname"
                placeholder="Change your Full Name"
                value={user.fullname || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Change Email</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="email"
                placeholder="Write your new email"
                value={user.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Change Password</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="password"
                placeholder="Write your new password"
                value={user.password || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Courses</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="courses"
                placeholder="e.g. 3 months, 6 months"
                value={user.courses.join(", ") || ""}
                onChange={handleChange}
              />
              <div className="formatted-requirements">
                {formatList(user.courses.join("\n"))}
              </div>
            </div>
            <div className="form-group">
              <label className="internshipform-labels">University</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="university"
                placeholder="Write your University"
                value={user.university.join(", ") || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Highschool</label>
              <input
                className="internshipform-inputs"
                name="highschool"
                placeholder="Write your High School"
                value={user.highschool.join(", ") || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Skills</label>
              <textarea
                className="internshipform-inputs"
                name="skills"
                placeholder="Write some of your skills"
                value={user.skills.join(", ") || ""}
                onChange={handleChange}
              />
              <div className="formatted-requirements">
                {formatList(user.skills.join("\n"))}
              </div>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-internship">
                Cancel
              </button>
              <button onClick={() => setShowFilterModal(false)}>Cancel</button>
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MyProfile;
