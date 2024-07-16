import React, { useState, useEffect } from "react";
import "../../components/Internships/Internships.scss";
import InternshipCard from "../../components/Internships/InternshipCard.js";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import api from "../../api.js";
import sorticon from "../../imgsrc/sorticon.svg";
import categories from "../../imgsrc/categories.svg";

function Internships() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [internships, setInternships] = useState([]);
  const [filter, setFilter] = useState({
    category: "all",
  });
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const getAllInternships = async () => {
    try {
      const response = await api.get("/internships", {
        params: { ...filter, page, limit, sortOrder },
      });
      const sortedInternships = response.data.internships.sort(
        (a, b) => new Date(b.registeredDate) - new Date(a.registeredDate)
      );
      setInternships(sortedInternships);
      setTotal(response.data.total);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   history.push("/");
    //   return;
    // }
    getAllInternships();
  }, [filter, sortOrder, page, limit]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
        (filterType === "part-time" &&
          internship.type.toLowerCase().startsWith("p")) ||
        (filterType === "full-time" &&
          internship.type.toLowerCase().startsWith("f"));
      const matchesCategory =
        filter.category === "all" || internship.category === filter.category;
      return matchesSearchQuery && matchesFilterType && matchesCategory;
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.registeredDate) - new Date(a.registeredDate)
        : new Date(a.registeredDate) - new Date(b.registeredDate)
    );

  return (
    <div>
      <NavBar />
      <div className="internship_body">
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
      <div className="internship-pagination">
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
      <Footer />
    </div>
  );
}

export default Internships;
