import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  return (
    <div className="navbarcontainer">
      <img src={require("./internnexus.png")} className="navbarlogo" />
      <div className="navbartabs">
        <div>
          <Link to="/" className="navbarlinks">
            HOME
          </Link>
        </div>
        <div>
          <Link to="/internships" className="navbarlinks">
            INTERNSHIPS
          </Link>
        </div>
        <div>
          <Link to="/student" className="navbarlinks">
            STUDENTS
          </Link>
        </div>
        <div className="navbarlogin">
          <Link to="/login" className="navbarlinks">
            LOG IN
          </Link>
        </div>
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
            <Link to="/" className="navbarlinks">
              HOME
            </Link>
          </li>
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
          <li>
            <Link to="/login" className="navbarlinks">
              LOG IN
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
