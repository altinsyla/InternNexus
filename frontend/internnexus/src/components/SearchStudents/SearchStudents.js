import React, { useEffect, useState } from "react";
import "./SearchStudents.scss";
import NavBar from "../NavBar/NavBar.js";
import Footer from "../Footer/Footer.js";
import StudentCard from "./StudentCard.js";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const SearchStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(1); // default 1 me i filtru me emra, 2 per me username

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const studentCards = [
    {
      profilePic: require("../Home/img/AltinSyla.jpg"),
      fullName: "Altin Syla",
      username: "AltinS",
      skills: [
        "Software Developement",
        "Web Developement",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
      ],
    },
    {
      profilePic: require("../Home/img/FlamurIsa.jpg"),
      fullName: "Flamur Isa",
      username: "Isa",
      skills: [
        "Software Developement",
        "Web Developement",
        "Full Stack Developer",
      ],
    },
    {
      profilePic: require("../Home/img/HakifKadriu.jpg"),
      fullName: "Hakif Kadriu",
      username: "Kifa2",
      skills: [
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
      ],
    },
    {
      profilePic: require("../Home/img/HakifKadriu.jpg"),
      fullName: "Hakif Kadriu",
      username: "Kifa",
      skills: [
        "Software Developement",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
      ],
    },
    {
      profilePic: require("../Home/img/HakifKadriu.jpg"),
      fullName: "Hakif Kadriu",
      username: "Kifa",
      skills: [
        "Software Developement",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
      ],
    },
    {
      profilePic: require("../Home/img/HakifKadriu.jpg"),
      fullName: "Hakif Kadriu",
      username: "Kifa",
      skills: [
        "Software Developement",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
      ],
    },
    {
      profilePic: require("../Home/img/HakifKadriu.jpg"),
      fullName: "Rinor Rashica",
      username: "rinor",
      skills: [
        "Software Developement",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
      ],
    },
  ];

  const splitSearchQuery = searchQuery.split(" ");

  const filteredStudentCardsByName = studentCards.filter((card) =>
    card.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudentCardsByUsername = studentCards.filter((card) =>
    card.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudentCardsbySkill = studentCards.filter((card) =>
    card.skills.includes("Software Developement")
  );

  return (
    <div>
      <NavBar></NavBar>
      <div className="container ssBody">
        <h1 className="fontregular" style={{ marginTop: "3rem" }}>
          Search Students
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="studentsearchInput"
        />

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
              onClick={() => setFilter(1)}
            >
              Name
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              value={2}
              variant="outline-dark"
              onClick={() => setFilter(2)}
            >
              Username
            </ToggleButton>
            {/* <ToggleButton
              id="tbg-radio-2"
              value={3}
              variant="outline-dark"
              onClick={() => setFilter(3)}
            >
              Skill
            </ToggleButton> */}
          </ToggleButtonGroup>
        </div>

        {/* <div className="filterSkillDiv">
          <ToggleButtonGroup
            type="checkbox"
            // defaultValue={[1, 2, 3]}
            className="mb-2"
          >
            <ToggleButton id="tbg-check-1" value={1}>
              Checkbox 1 (pre-checked)
            </ToggleButton>
            <ToggleButton id="tbg-check-2" value={2}>
              Checkbox 2
            </ToggleButton>
            <ToggleButton id="tbg-check-3" value={3}>
              Checkbox 3 (pre-checked)
            </ToggleButton>
          </ToggleButtonGroup>
        </div> */}

        <div className="profilesDiv">
          {(() => {
            if (filter === 1) {
              return filteredStudentCardsByName.map((card, index) => (
                <StudentCard key={index} {...card} />
              ));
            } else if (filter === 2) {
              return filteredStudentCardsByUsername.map((card, index) => (
                <StudentCard key={index} {...card} />
              ));
            }
          })()}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SearchStudents;
