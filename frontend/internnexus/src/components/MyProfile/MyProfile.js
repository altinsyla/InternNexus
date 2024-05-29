import React from "react";
import internnexus from "../../imgsrc/internnexus.png";
import "./MyProfile.scss";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function MyProfile() {
  return (
    <>
    <NavBar />
    <div className="main-div">
      <div className="leftContainer">
    <input type="image" className="profilePic" />
    <h3 className="profileName">Flamur Isa</h3>
    </div>

    <div className="rightContainer">
      <form>
        <p>About Me :</p>
        <input type='text' placeholder="Write something about yourself" className="formInput"></input>
        <p>Skills :</p>
        <input type='text' placeholder="Write your programming skills" className="formInput"></input>
        <p>University :</p>
        <input type='text' placeholder="University which you studied in, optional" className="formInput"></input>
        <p>High School Education :</p>
        <input type='text' placeholder="High School which you finished" className="formInput"></input>
        <p>Courses :</p>
        <input type='text' placeholder="Courses that you followed" className="formInput"></input>
      </form>
      <button>Edit Profile</button>
    </div>
    </div>
    <Footer />
    </>
  );
}

export default MyProfile;
