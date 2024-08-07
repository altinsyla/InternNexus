import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import api from "../../api.js";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import "../MyProfile/MyProfile.scss";
import Swal from "sweetalert2";
import Dropdown from "react-bootstrap/Dropdown";
import useGlobalFunctions from "../globalFunctions.js";

function MyProfile() {
  const { getAllSkills } = useGlobalFunctions();

  const { username, id } = useParams();
  const history = useHistory();
  const [currentUser, setcurrentUser] = useState({});
  const [allSkills, setAllSkills] = useState({});
  const [newSkills, setnewSkills] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [show, setShow] = useState(false);
  const [imagePreviewUrl, setimagePreviewUrl] = useState("");

  const getcurrentUser = async () => {
    try {
      const response = await api.get(
        "/user/" + localStorage.getItem("username")
      );
      setcurrentUser(response.data);
      setnewSkills(response.data.skills);
    } catch (err) {
      console.log("Error getting custom users");
    }
  };

  useEffect(() => {
    getcurrentUser();
    getAllSkills()
      .then((result) => {
        setAllSkills(result);
      })
      .catch((error) => {
        console.log(error.message);
      });

    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [username]);

  const handleFileChange = (e) => {
    setcurrentUser({ ...currentUser, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setcurrentUser({ ...currentUser, [name]: value });
  };

  const handleSkillAdd = (e, skillName) => {
    e.preventDefault();

    // let uniqueSkills = [...new Set(newSkills)];
    
    if (!newSkills.includes(skillName)) {
      setnewSkills([...newSkills, skillName]);
    }
  };

  const checkIfEnteronArray = (e) => {
    const { name, value } = e.target;
    if (e.key === "Enter") {
      e.preventDefault();

      if (name === "courses") {
        setcurrentUser({
          ...currentUser,
          courses: [...currentUser.courses, value],
        });
      } else if (name === "highschool") {
        setcurrentUser({
          ...currentUser,
          highschool: [...currentUser.highschool, value],
        });
      } else if (name === "university") {
        setcurrentUser({
          ...currentUser,
          university: [...currentUser.university, value],
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    if (!currentUser.username || !currentUser.email) {
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
    formData.append("courses", JSON.stringify(currentUser.courses));
    formData.append("university", JSON.stringify(currentUser.university));
    formData.append("highschool", JSON.stringify(currentUser.highschool));
    formData.append("skills", JSON.stringify(newSkills));

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

        <div
          className="myprofilebannerrightside"
          style={{ textAlign: "center" }}
        >
          <img
            src={`http://localhost:5001/userimages/${currentUser.image}`}
            alt="studentPhoto"
            className="imgprofilephoto"
          />
          <div className="editing-buttons" style={{ marginTop: "5px" }}>
            <button onClick={() => setShowFilterModal(true)}>
              Edit Profile <i className="bi bi-pencil-square"></i>
            </button>
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
          <form
            onSubmit={(e) => {
              handleSubmit();
              e.preventDefault();
            }}
            encType="form-type"
          >
            <p className="internshipform-details">Edit Your Profile</p>
            <div
              className="form-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Courses</label>
              <p className="inputDisclaimer">Press Enter to Submit</p>
              <input
                type="text"
                className="internshipform-inputs"
                name="courses"
                placeholder="Write your courses"
                onKeyDown={(e) => checkIfEnteronArray(e)}
              />
              <div className="skillsListDiv">
                <ul className="skillsList">
                  Current courses:
                  {currentUser.courses?.map((skill) => (
                    <li
                      key={skill._id}
                      style={{
                        borderBottom: "1px solid black",
                        width: "fit-content",
                      }}
                    >
                      {skill}
                      <i
                        className="bi bi-trash dashboardActionIcons"
                        style={{ marginLeft: "10px" }}
                        onClick={(e) => {
                          setcurrentUser({
                            ...currentUser,
                            courses: currentUser.courses.filter(
                              (user) => user !== skill
                            ),
                          });
                        }}
                      ></i>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="formatted-requirements"></div>
            </div>
            <div className="form-group">
              <label className="internshipform-labels">University</label>
              <p className="inputDisclaimer">Press Enter to Submit</p>
              <input
                type="text"
                className="internshipform-inputs"
                name="university"
                placeholder="Write your University"
                onKeyDown={(e) => checkIfEnteronArray(e)}
              />
              <div className="skillsListDiv">
                <ul className="skillsList">
                  Current University:
                  {currentUser.university?.map((skill) => (
                    <li
                      key={skill._id}
                      style={{
                        borderBottom: "1px solid black",
                        width: "fit-content",
                      }}
                    >
                      {skill}
                      <i
                        style={{ marginLeft: "10px" }}
                        className="bi bi-trash dashboardActionIcons"
                        onClick={(e) => {
                          setcurrentUser({
                            ...currentUser,
                            university: currentUser.university.filter(
                              (user) => user !== skill
                            ),
                          });
                        }}
                      ></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Highschool</label>
              <p className="inputDisclaimer">Press Enter to Submit</p>
              <input
                className="internshipform-inputs"
                name="highschool"
                placeholder="Write your High School"
                onKeyDown={(e) => checkIfEnteronArray(e)}
              />
              <div className="skillsListDiv">
                <ul className="skillsList">
                  Current Highschool:
                  {currentUser.highschool?.map((skill) => (
                    <li
                      key={skill._id}
                      style={{
                        borderBottom: "1px solid black",
                        width: "fit-content",
                      }}
                    >
                      {skill}
                      <i
                        style={{ marginLeft: "10px" }}
                        className="bi bi-trash dashboardActionIcons"
                        onClick={(e) => {
                          setcurrentUser({
                            ...currentUser,
                            highschool: currentUser.highschool.filter(
                              (user) => user !== skill
                            ),
                          });
                        }}
                      ></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label className="internshipform-labels">Skills</label>
              <div className="skillsListDiv">
                <ul className="skillsList">
                  {newSkills?.map((skill) => (
                    <li
                      style={{
                        borderBottom: "1px solid black",
                        width: "fit-content",
                      }}
                    >
                      {skill.skillName}
                      <i
                        style={{ marginLeft: "10px" }}
                        className="bi bi-trash dashboardActionIcons"
                        onClick={(e) => {
                          setnewSkills(
                            newSkills.filter((skills) => skills._id !== skill._id)
                          );
                        }}
                      ></i>
                    </li>
                  ))}
                </ul>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  className="internshipform-inputs"
                  style={{ backgroundColor: "transparent", color: "black" }}
                >
                  Select your skills
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allSkills.map((skill) => (
                    <Dropdown.Item onClick={(e) => handleSkillAdd(e, skill)}>
                      {skill.skillName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <div className="formatted-requirements">
                {/* {formatList(currentUser?.skills.join("\n"))} */}
                {/* {currentUser.skills?.map((skill) => skill.skillName)} */}
              </div>
            </div>
            <div className="form-buttons">
              <button
                style={{ backgroundColor: "#ea738d" }}
                onClick={() => setShowFilterModal(false)}
              >
                Cancel
              </button>
              <button type="submit" style={{ backgroundColor: "#d3c0b4" }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MyProfile;
