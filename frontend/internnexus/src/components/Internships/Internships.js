import React, { useState } from "react";
import "../../components/Internships/Internships.scss";
import InternshipCard from "../../components/Internships/InternshipCard.js";
import frakton from "../Internships/img/frakton.png";
import xponent from "../Internships/img/xponent.jpg";
import starlabs from "../Internships/img/starlabs.png";
import ict from "../Internships/img/ict.png";
import solaborate from "../Internships/img/solaborate.png";
import Footer from '../Footer/Footer.js';
import NavBar from '../NavBar/NavBar.js';
import InternshipApply from "../InternshipApply/InternshipApply.js";
// import { Link } from "react-router-dom";

function Internships() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //Objekt me i marr t'dhanat
  const internshipCards = [
    {
      title: "Front-End Developer",
      type: "Full-time",
      location: "Prishtina",
      image: xponent,
    },
    {
      title: "Back-End Developer",
      type: "Part-time",
      location: "Prishtina",
      image: frakton,
    },
    {
      title: "UI/UX Designer",
      type: "Full-time",
      location: "Prishtina",
      image: starlabs,
    },
    {
      title: "Game Developer",
      type: "Part-time",
      location: "Prizren",
      image: ict,
    },
    {
      title: "Front-End Developer",
      type: "Full-time",
      location: "Remote",
      image: solaborate,
    },
  ];

  // Na jep results edhe nese e dhajm me tvogla
  const filteredInternshipCards = internshipCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="internship_body">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="internshipsearchInput"
        />
        {filteredInternshipCards.map((card, index) => (
          <InternshipCard key={index} {...card}/>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Internships;
