import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../api";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import "./MyProfile.scss";



// mas pari shtine ni form krejt kolonat e userModel




function MyProfile() {
  const history = useHistory();
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);

  const getcurrentuser = async () => {
    try {
      const response = await api.get(
        "/user/" + localStorage.getItem("username")
      );
      setcurrentUser(response.data);
      console.log(response.data.skills);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await api.get(`/user/${username}`);
      setUser(response.data);
    } catch (err) {
      console.log("Failed fetching user data");
    }
  };

  useEffect(() => {
    fetchUser();
    getcurrentuser();
  }, [username]);

  return (
    <>
      <NavBar />
      <div className="main-div">
        <div className="leftContainer">
          <input type="image" className="profilePic" />
          <h3 className="profileName">{currentUser.username}</h3>
        </div>

        <div className="rightContainer">
          <form>
            <p>About Me :</p>
            <input
              type="text"
              placeholder="Write something about yourself"
              value={currentUser.about}
              className="formInput"
            ></input>
            <p>Skills :</p>
            {/* <input type='text' placeholder="Write your programming skills"  value={currentUser.skills} className="formInput"></input> */}
            <div>
            {currentUser.skills?.map((user) => (
              <span key={user._id}>{user.skillName} </span>
            ))}
            </div>
            {/* <p
              type="text"
              placeholder="Write your programming skills"
              value={currentUser.skills}
              className="formInput"
            ></p> */}

            <p>University :</p>
            <input
              type="text"
              placeholder="University which you studied in, optional"
              value={currentUser.university}
              className="formInput"
            ></input>
            <p>High School Education :</p>
            <input
              type="text"
              placeholder="High School which you finished"
              value={currentUser.highschool}
              className="formInput"
            ></input>
            <p>Courses :</p>
            <input
              type="text"
              placeholder="Courses that you followed"
              value={currentUser.courses}
              className="formInput"
            ></input>
          </form>
          <button>Edit Profile</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyProfile;
