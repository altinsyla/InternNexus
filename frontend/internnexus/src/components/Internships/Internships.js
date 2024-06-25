import React, { useState, useEffect } from "react";
import "../../components/Internships/Internships.scss";
import InternshipCard from "../../components/Internships/InternshipCard.js";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import api from "../../api.js";
import { useHistory } from "react-router-dom";
import sorticon from '../../imgsrc/sorticon.svg';
import categories from '../../imgsrc/categories.svg';

function Internships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const history = useHistory();
  const [internships, setInternships] = useState([]);
  const [filter, setFilter] = useState({
    category: "all",
  });

  const getAllInternships = async () => {
    try {
      const response = await api.get("/internships");
      //Qikjo i qet internshipet prej ma t'res nmomentin qe kyqum nfaqe
      const sortedInternships = response.data.sort(
        (a, b) => new Date(b.registeredDate) - new Date(a.registeredDate)
      );
      setInternships(sortedInternships);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  useEffect(() => {
    getAllInternships();
  }, [history]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  //qikjo perdoret te filtrimi
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  //qikjo perdoret te sortimi
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterrChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredInternships = internships
    .filter((internship) => {
      const matchesSearchQuery = internship.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilterType =
        filterType === "all" ||
        //qikjo na mundeson nese filtertype osht part-time dhe internship fillon me p
        (filterType === "part-time" &&
          internship.type.toLowerCase().startsWith("p")) ||
        //qikjo na mundeson nese filtertype osht full-time dhe internship fillon me f
        (filterType === "full-time" &&
          internship.type.toLowerCase().startsWith("f"));
      // qikjo na mundeson filtrimin, nese o all i merr krejt ose kategoria e internshipit osht e njejt me kategorin e filterit
      const matchesCategory =
        filter.category === "all" || internship.category === filter.category;
      return matchesSearchQuery && matchesFilterType && matchesCategory;
    })
    //qitu bohet sortimi
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.registeredDate) - new Date(a.registeredDate)
        : new Date(a.registeredDate) - new Date(b.registeredDate)
    );

  return (
    <div>
      <NavBar />
      <div className="internship_body">
        {/* <h1 style={{textAlign:"center", marginTop: "2rem"}}>Got Talent?<br /> Meet our Opportunity</h1>
        <h5 style={{textAlign: "center"}}>Find Jobs, Employment & Career Opportunities. Some of the companies <br /> we've helped recruit excellent applicants over the years.</h5> */}
        <h2 className="fontregular" style={{ marginTop: "5%" }}>
          Search Internships
        </h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="internshipsearchInput"
        />
        <div className="filter-sort-container">
          <p style={{ fontFamily: "poppins_bold", marginTop: "3px" }}>
            Filter by:
          </p>
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="part-time">Part-Time</option>
            <option value="full-time">Full-Time</option>
          </select>
          <img src={categories} className="sorticon"></img>
          <select
            name="category"
            value={filter.category}
            onChange={handleFilterrChange}
            className="filter-select"
            aria-placeholder="selectOne"
          >
            <option value="all">All Categories</option>
            <option value="Front-End Developer">Front-End Developer</option>
            <option value="Back-End Developer">Back-End Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Machine Learning Engineer">
              Machine Learning Engineer
            </option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Cloud Architect">Cloud Architect</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Blockchain Developer">Blockchain Developer</option>
            <option value="IoT Developer">IoT Developer</option>
            <option value="Mobile Application Developer">
              Mobile Application Developer
            </option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
          <img src={sorticon} className="sorticon"></img>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>
        {filteredInternships.map((internship) => (
          <InternshipCard key={internship._id} {...internship} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Internships;
