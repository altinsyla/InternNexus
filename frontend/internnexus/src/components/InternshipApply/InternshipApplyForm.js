import React, { useState} from "react";
import "../InternshipForm/InternshipForm.scss";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../src/api";
import Swal from "sweetalert2";

function InternshipApplyForm() {
  const history = useHistory();
  const { internshipID } = useParams(); // e merr ID e internshipit qe dojm me apliku
  const [internshipApply, setInternshipApply] = useState({
    username: localStorage.getItem("username"),
    cv: null,
    additionalMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternshipApply({ ...internshipApply, [name]: value });
  };

  const handleFileChange = (e) => {
    setInternshipApply({ ...internshipApply, cv: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (internshipApply.cv) {
      formData.append("cv", internshipApply.cv);
    }
    formData.append("username", internshipApply.username);
    formData.append("additionalMessage", internshipApply.additionalMessage);
    formData.append("internshipID", internshipID);

    try {
      const result = await Swal.fire({
        title: "Are you sure you want to apply?",
        text: "NOTE: You can apply only once in 24h",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, apply!",
        position: "center"
      });
    
      if (result.isConfirmed) {
        const response = await api.post("/internshipapplication", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        if (response.status === 201) {
          Swal.fire({
            title: "Good job!",
            text: "Good luck, You have applied successfully for this internship!",
            icon: "success",
          });
          history.push("/internships");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          title: "You can apply only once in 24 hours",
          icon: "warning",
        });
      } else {
        console.error("Failed to apply for internship", error);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
        });
      }
    }
  };
  
  const handleCancel = () => {
    history.push("/internships");
  };

  const formatList = (input) => {
    if (input.trim() === "") return "";
    const listItems = input.split("\n");
    return (
      <ul>
        {listItems.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="internship-form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <p className="internshipform-details">Internship Apply Details</p>
          <p className="fill-out-form">
            Fill out the form below to apply on this internship
          </p>
          <p className="internshipform-labels">Include a CV</p>
          <div className="form-group">
            <input
              type="file"
              className="internshipform-inputs"
              name="cv"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Additional Message:</label>
            <textarea
              className="internshipform-inputs"
              name="additionalMessage"
              placeholder="Write something about you"
              value={internshipApply.additionalMessage}
              onChange={handleChange}
            />
            <div className="formatted-requirements">
              {formatList(internshipApply.additionalMessage)}
            </div>
          </div>
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-internship"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="create-internship">
              Apply
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipApplyForm;
