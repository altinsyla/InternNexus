import React, { useState, useEffect } from "react";
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
      await api.post("/internshipapplication", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Good job!",
        text: "Good luck, You have applied successfully on this internship!",
        icon: "success",
      });
      history.push("/internships");
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: "Fields need to be filled!",
        icon: "error",
      });
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
