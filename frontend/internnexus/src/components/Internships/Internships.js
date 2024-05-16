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

function Internships() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [showForm, setShowForm] = useState(false);
  const [internshipCards, setInternshipCards] = useState([
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
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredInternshipCards = internshipCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const newInternship = {
  //     title: event.target.title.value,
  //     type: event.target.type.value,
  //     location: event.target.location.value,
  //     image: solaborate, // Placeholder image, you can change this as needed
  //   };
  //   setInternshipCards([...internshipCards, newInternship]);
  //   setShowForm(false); // Close the form after submission
  // };

  return (
    <div>
      <NavBar />
      <div className="internship_body">
        <h2 className="fontregular" style={{marginTop: '5%'}}>Search Internships</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="internshipsearchInput"
        />
        {filteredInternshipCards.map((card, index) => (
          <InternshipCard key={index} {...card} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Internships;
