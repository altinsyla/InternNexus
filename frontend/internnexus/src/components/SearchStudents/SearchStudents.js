import React, { useEffect, useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import api from "../../api.js";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import "./SearchStudents.scss";
import StudentCard from "./StudentCard.js";

const SearchStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("fullname"); // default fullname, pastaj jon username edhe skills
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const getUsers = async () => {
    try {
      const response = await api.get("/user", {
        params: {...filter, page, limit, sortOrder}
      });
      setUsers(response.data.users);
      setTotal(response.data.total);

    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  const applyFilter = async () => {
    const response = await api.get("/user?" + filter + "=" + searchQuery);
    setUsers(response.data.users);
    setTotal(response.data.total)
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
  }, [filter, sortOrder, page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  return (
    <div>
      <NavBar></NavBar>
      <div className="container ssBody">
        <h1 className="fontregular" style={{ marginTop: "3rem" }}>
          Search Students
        </h1>
        {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="studentsearchInput"
          ></input>
          {isTyping ? (
            <button
              className="btn btn-dark mr-2"
              style={{  alignSelf: "center", marginTop:"0.5rem", padding: "0.15rem 0.5rem", fontFamily: 'poppins_thin'}}
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          ) : (
            ""
          )}
        {/* </div> */}

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
            {/* <ToggleButton
              id="tbg-radio-3"
              value={3}
              variant="outline-dark"
              onClick={() => {
                setFilter("skill");
              }}
              onChange={() => applyFilter()}
            >
              Skill
            </ToggleButton> */}
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
        <div className="student-pagination">
        {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </div>
     
      <Footer></Footer>   
    </div>
  );
};

export default SearchStudents;
