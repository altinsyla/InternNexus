import React, { useEffect, useState } from "react";
import "./SearchStudents.scss";
import NavBar from "../NavBar/NavBar.js";
import Footer from "../Footer/Footer.js";
import StudentCard from "./StudentCard.js";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import api from "../../api.js";

const SearchStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("fullname"); // default fullname, pastaj jon username edhe skills
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const getUsers = async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  const applyFilter = async () => {
    const response = await api.get("/user?" + filter + "=" + searchQuery);
    setUsers(response.data);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    applyFilter();
    setIsTyping(true);
  };

  const clearFilter = async () => {
    const response = await api.get("/user");
    setUsers(response.data);
    setSearchQuery("");
    setIsTyping(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div className="container ssBody">
        <h1 className="fontregular" style={{ marginTop: "3rem" }}>
          Search Students
        </h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="studentsearchInput"
          ></input>
          {isTyping ? (
            <button
              className="btn btn-primary mr-2"
              style={{ width: "fit-content", alignSelf: "center" }}
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          ) : (
            ""
          )}
        </div>

        <h4
          style={{
            fontFamily: "poppins_bold",
            alignSelf: "center",
            marginTop: "5rem",
          }}
        >
          Filter By:
        </h4>
        <div className="filterDiv">
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton
              id="tbg-radio-1"
              value={1}
              variant="outline-dark"
              onClick={() => {
                setFilter("fullname");
              }}
              onChange={() => applyFilter()}
            >
              Name
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              value={2}
              variant="outline-dark"
              onClick={() => {
                setFilter("username");
              }}
              onChange={() => applyFilter()}
            >
              Username
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-3"
              value={3}
              variant="outline-dark"
              onClick={() => {
                setFilter("skill");
              }}
              onChange={() => applyFilter()}
            >
              Skill
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <p className="fontthin" style={{ marginTop: "0.2rem" }}>
          Results: {users.length}
        </p>
        <div className="profilesDiv">
          {users.map((user) => (
            <StudentCard key={user._id} username={user.username} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SearchStudents;
