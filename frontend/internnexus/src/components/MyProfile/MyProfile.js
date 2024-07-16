import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import api from "../../api.js";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import "../MyProfile/MyProfile.scss";
import Swal from "sweetalert2";

function MyProfile() {
  const { username, id } = useParams();
  const history = useHistory();
  const [currentUser, setcurrentUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [show, setShow] = useState(false);

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
    getcurrentUser();

    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [username]);

  const handleFileChange = (e) => {
    setcurrentUser({ ...currentUser, image: e.target.files[0] });
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
      setcurrentUser({
        ...currentUser,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setcurrentUser({ ...currentUser, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check required fields
    if (
      !currentUser.username ||
      !currentUser.fullname ||
      !currentUser.email ||
      !currentUser.password
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields need to be filled!",
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    if (currentUser.image) {
      formData.append("image", currentUser.image);
    }
    formData.append("username", currentUser.username);
    formData.append("fullname", currentUser.fullname);
    formData.append("email", currentUser.email);
    formData.append("password", currentUser.password);
    formData.append("role", currentUser.role);
    formData.append("about", currentUser.about);

    // Append arrays properly
    currentUser.courses.forEach((course, index) =>
      formData.append(`courses[${index}]`, course)
    );
    currentUser.university.forEach((uni, index) =>
      formData.append(`university[${index}]`, uni)
    );
    currentUser.highschool.forEach((school, index) =>
      formData.append(`highschool[${index}]`, school)
    );
    currentUser.skills.forEach((skill, index) =>
      formData.append(`skills[${index}]`, skill)
    );

    // // Debugging: Log formData entries
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    try {
      await api.patch(`/user/${currentUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        text: "Profile successfully edited!",
        icon: "success",
      });

      history.go(0);
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

        <div className="myprofilebannerrightside" style={{textAlign: 'center'}}>
          <img
            src={`http://localhost:5001/userimages/${currentUser.image}`}
            alt="studentPhoto"
            className="imgprofilephoto"
          />
          <div className="editing-buttons" style={{marginTop: '5px'}}>
            <button onClick={() => setShowFilterModal(true)}>Edit Profile <i class="bi bi-pencil-square"></i></button>
          </div>
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
              <label className="internshipform-labels">
                Change Profile Picture
              </label>
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
                value={currentUser.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">About Me:</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="about"
                placeholder="Write about yourself"
                value={currentUser.about || ""}
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
                value={currentUser.fullname || ""}
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
                // value={user.email || ""}
                value={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div style={{ display: "flex" }}>
                <label
                  className="internshipform-labels"
                  style={{
                    display: "inline-block",
                    margin: 0,
                    marginRight: "10px",
                  }}
                >
                  Change Password{" "}
                </label>
                <input
                  type="checkbox"
                  style={{ width: "15px" }}
                  onClick={() => setShow(!show)}
                />
              </div>
              {show && (
                <div style={{ marginTop: "10px" }}>
                  {" "}
                  <input
                    type="text"
                    className="internshipform-inputs"
                    name="password"
                    placeholder="Write your new password"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Courses</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="courses"
                placeholder="e.g. 3 months, 6 months"
                // value={currentUser?.courses.join(", ") || ""}
                onChange={handleChange}
              />
              <div className="formatted-requirements">
                {/* {formatList(currentUser?.courses.join("\n"))} */}
              </div>
            </div>
            <div className="form-group">
              <label className="internshipform-labels">University</label>
              <input
                type="text"
                className="internshipform-inputs"
                name="university"
                placeholder="Write your University"
                // value={currentUser?.university.join(", ") || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Highschool</label>
              <input
                className="internshipform-inputs"
                name="highschool"
                placeholder="Write your High School"
                // value={currentUser?.highschool.join(", ") || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Skills</label>
              <input
                className="internshipform-inputs"
                name="skills"
                placeholder="Write some of your skills"
                // value={currentUser?.skills.join(", ") || ""}
                onChange={handleChange}
              />
              <div className="formatted-requirements">
                {/* {formatList(currentUser?.skills.join("\n"))} */}
                {/* {currentUser.skills?.map((skill) => skill.skillName)} */}
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
