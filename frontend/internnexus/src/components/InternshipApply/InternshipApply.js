import React, { useState, useEffect } from "react";
import "../../components/InternshipApply/InternshipApply.scss";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api.js";
import Swal from "sweetalert2";

function InternshipApply() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

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

  const handleEdit = (id) => {
    history.push(`/internshipForm/${id}`);
  };
  const handleApply = () => {
    Swal.fire({
      title: "Applied!",
      text: "You successfully applied!",
      icon: "success",
    });
    history.push("/internships");
  };
  const deleteInternship = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FF0000",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await api.delete(`/internships/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your internship has been deleted.",
          icon: "success",
        });
        history.push("/internships");
      }
    } catch (err) {
      console.error("Failed to delete internship", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete internship",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!internship) {
    return <div>No internship found.</div>;
  }

  const formatList = (input) => {
    if (!input) return null;
    return input.split("\n").map((item, index) => <li key={index}>{item}</li>);
  };

  return (
    <div>
      <NavBar />
      <div className="applymainContainer">
        <div className="applyCard">
          <img
            src={`http://localhost:5001/images/${internship.image}`}
            alt="Company Logo"
            className="applycompanyLogo"
          />
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
            <div className="edit-delete-btn">
              <button className="btn-apply" onClick={handleApply}>
                Apply Now
              </button>
              <button
                className="btn-apply"
                onClick={() => handleEdit(internship._id)}
              >
                Edit
              </button>
              <button className="btn-apply" onClick={deleteInternship}>
                Delete
              </button>
            </div>
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
