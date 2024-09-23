import React, { useEffect, useState, useCallback } from "react";
import "./NavBar.scss";
import Dropdown from "react-bootstrap/Dropdown";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api.js";
import useGlobalFunctions from "../globalFunctions.js";

//Hover logo with box-shadow
const NavBar = () => {
  const { handleLogOut } = useGlobalFunctions();

  const [currentUser, setcurrentUser] = useState([]);

  const getcurrentuser = async () => {
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
    if (localStorage.getItem("token")) {
      getcurrentuser();
    }
  }, []);

  return (
    <div className="navbarcontainer">
      <Link to="/">
        <img src={require("./internnexus.png")} className="navbarlogo" />
      </Link>
      <div className="navbartabs">
        <div>
          <Link to="/Internships" className={`navbarlinks navbarsimplelinks`}>
            INTERNSHIPS
          </Link>
        </div>
        <div>
          <Link to="/students" className="navbarlinks navbarsimplelinks">
            STUDENTS
          </Link>
        </div>
        {!localStorage.getItem("token") ? (
          <>
            <div>
              <Link to="/login" className="navbarlinks navbarsimplelinks">
                LOG IN
              </Link>
            </div>
            <div>
              <Link
                to="/signupform"
                className="navbarlogin navbarlinks navbarlogintext"
              >
                SIGN UP
              </Link>
            </div>
          </>
        ) : (
          <div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "#d3c0b4", width: "fit-content" }}
              >
                {currentUser?.username}{" "}
                <img
                  src={`https://internnexus.onrender.com/userimages/${currentUser?.image}`}
                  alt="studentPhoto"
                  style={{
                    width: "20px",
                    height: "20px",
                    padding: 0,
                    margin: 0,
                    marginBottom: "1px",
                    borderRadius: "10px",
                  }}
                />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/myprofile" className="navbarlinks">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
                {/* <li> 
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="navbardropdown">
        <button
          className="btn"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <MenuIcon></MenuIcon>
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link to="/internships" className="navbarlinks">
              INTERNSHIPS
            </Link>
          </li>
          <li>
            <Link to="/student" className="navbarlinks">
              STUDENTS
            </Link>
          </li>
          {!localStorage.getItem("token") ? (
            <>
              {" "}
              <li>
                <Link to="/login" className="navbarlinks">
                  LOG IN
                </Link>
              </li>
              <li>
                <Link to="/signupform" className="navbarlinks">
                  SIGN UP
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/myprofile" className="navbarlinks">
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item navbarlinks"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
