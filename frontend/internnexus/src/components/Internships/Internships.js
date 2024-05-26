import React, { useState, useEffect } from "react";
import "../../components/Internships/Internships.scss";
import InternshipCard from "../../components/Internships/InternshipCard.js";
import Footer from '../Footer/Footer.js';
import NavBar from '../NavBar/NavBar.js';
import api from '../../api.js';
import { useHistory } from "react-router-dom";

function Internships() {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const [internships, setInternships] = useState([]);

  const getAllInternships = async () => {
    try {
      const response = await api.get("/internships");
      setInternships(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
      return;
    }
    getAllInternships();
  }, [history]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredInternships = internships.filter((internship) =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="internship_body">
        <h2 className="fontregular" style={{ marginTop: '5%' }}>Search Internships</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="internshipsearchInput"
        />
        {filteredInternships.map((internship) => (
          <InternshipCard key={internship._id} {...internship} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Internships;
