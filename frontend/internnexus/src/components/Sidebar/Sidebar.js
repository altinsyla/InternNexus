import React from "react";
import { Link, useHistory } from "react-router-dom";
import '../Sidebar/Sidebar.scss';
import Swal from "sweetalert2";
import usericon from '../../imgsrc/usericon.svg';
import jobicon from '../../imgsrc/jobicon.svg';
import logouticon from '../../imgsrc/logout.svg';
import applications from '../../imgsrc/applications.svg'

function Sidebar() {
  const history = useHistory();
  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/login");
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/admindashboard">
            <img src={usericon} alt="user-image" className="sidebar-icons"></img>
            Users
          </Link>
        </li>
        <li>
          <Link to="/adinternship">
           <img src={jobicon} className="sidebar-icons"></img>
            Internships
          </Link>
        </li>
        <li>
          <Link to="/adapplications">
           <img src={applications} className="sidebar-icons"></img>
            Applications
          </Link>
        </li>
        <div className="sidebar-logout" onClick={handleLogOut}>
          <img src={logouticon} className="sidebar-icons"></img>
          Log Out
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
