import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../Sidebar/Sidebar.scss";
import Swal from "sweetalert2";
import usericon from "../../imgsrc/usericon.svg";
import jobicon from "../../imgsrc/jobicon.svg";
import logouticon from "../../imgsrc/logout.svg";
import applications from "../../imgsrc/applications.svg";

function Sidebar() {
  const history = useHistory();

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/login");
  }

  return (
    <div className="admindashboard-body">
      <div className="admindashboard-sidebar">
        <div className="admindashboard-logo">
          <h2 onClick={() => history.push("/")}>InternNexus</h2>
          <h6>Admin Dashboard</h6>
        </div>
        <hr></hr>
        <ul className="admindashboard-sidebar-menu">
          <div>
            <li>
              <a onClick={() => history.push("/admindashboard")}>Users</a>
            </li>
            <li>
              <a onClick={() => history.push("/adinternship")}>Internships</a>
            </li>
            <li>
              <a onClick={() => history.push("/adapplications")}>
                Applications
              </a>
            </li>
          </div>
          <li style={{ marginTop: "auto", height: "100%" }}>
            <a onClick={handleLogOut}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
