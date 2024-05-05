import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

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
        <Dropdown>
          <Dropdown.Toggle></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/" className="navbarlinks">
                HOME
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/internships" className="navbarlinks">
                INTERNSHIPS
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/student" className="navbarlinks">
                STUDENTS
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/login" className="navbarlinks">
                LOG IN
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
