import React, { useState, useEffect } from "react";
import "../../components/InternshipApply/InternshipApply.scss";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import { useParams } from "react-router-dom";
import api from '../../api.js';

function InternshipApply() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await api.get(`/internships/${id}`);
        setInternship(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch internship details", err);
        setError("Failed to fetch internship details");
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  //Qita e qet loading kur ka me i marr t'dhanat
  if (loading) {
    return <div>Loading</div>;
  }

  //Qita e qet error kur ka naj gabim
  if (error) {
    return <div>{error}</div>;
  }

  //Qita e qet kur ska internship
  if (!internship) {
    return <div>No internship found.</div>;
  }

  //Qikjo na mundeson qe me kriju ni formatlist edhe ku tperdoret formatlista i bon per qdo enter e qet newline(bullet by default)
  const formatList = (input) => {
    if (!input) return null;
    return input.split("\n").map((item, index) => <li key={index}>{item}</li>);
  };

  return (
    <div>
      <NavBar />
      <div className="applymainContainer">
        <div className="applyCard">
          <img src={`http://localhost:5001/images/${internship.image}`} alt="Company Logo" className="applycompanyLogo" />
          <div className="specifications">
            <h2 className="fontbold" style={{ backgroundColor: "#FEF8F8" }}>
              {internship.title}
            </h2>
            <h5 className="fontregular" style={{ backgroundColor: "#FEF8F8" }}>
              <strong>Location: </strong> {internship.location}
            </h5>
            <h5 className="fontregular" style={{ backgroundColor: "#FEF8F8" }}>
              <strong>Type:</strong> {internship.type}
            </h5>
            <h5 className="fontregular" style={{ backgroundColor: "#FEF8F8" }}>
              <strong>Duration:</strong> {internship.duration}
            </h5>
            <button className="btn-apply">Apply Now</button>
          </div>
        </div>
        <div className="intapplydescription">
          <p className="int-requirements">Internship Requirements</p>
          <ul>{formatList(internship.requirements)}</ul>
        </div>
        <div className="intapplydescription">
          <p className="int-requirements">What we offer</p>
          <ul>{formatList(internship.offers)}</ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipApply;
