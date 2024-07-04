import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import api from "../../../src/api";

import "./Skillscard.scss"
function EditProfile() {
  return (
    <>
    <div>
      <NavBar />
      <div className="internship-form-container">
        <form  encType="multipart/form-data">
          <p className="internshipform-details">Internship Details</p>
          <p className="fill-out-form">
            {/* Fill out the form below to {id ? "edit" : "create"} an internship */}
            listing
          </p>
          <p className="internshipform-labels">
            Include an image of your Company
          </p>
          <div className="form-group">
            <input
              type="file"
              className="internshipform-inputs"
              name="image"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Internship Title</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="title"
              placeholder="Enter internship title"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Internship category</label>
            <select
              name="category"
              className="internshipform-inputs"
            >
              <option value="">Select a Category</option>
              <option value="Front-End Developer">Front-End Developer</option>
              <option value="Back-End Developer">Back-End Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Machine Learning Engineer">
                Machine Learning Engineer
              </option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Cloud Architect">Cloud Architect</option>
              <option value="Cybersecurity Analyst">
                Cybersecurity Analyst
              </option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Blockchain Developer">Blockchain Developer</option>
              <option value="IoT Developer">IoT Developer</option>
              <option value="Mobile Application Developer">
                Mobile Application Developer
              </option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Internship Type</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="type"
              placeholder="e.g. Full-time, Part-time"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Location</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="location"
              placeholder="e.g. Prishtine, Vushtrri, Remote"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Duration</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="duration"
              placeholder="e.g. 3 months, 6 months"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Salary</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="salary"
              placeholder="e.g. 500/monthly"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">
              Internship Requirements
            </label>
            <textarea
              className="internshipform-inputs"
              name="requirements"
              placeholder="List the requirements for the internship"
            />
            <div className="formatted-requirements">
              {/* {formatList(internship.requirements)} */}
            </div>
          </div>
          <div className="form-group">
            <label className="internshipform-labels">What We Offer</label>
            <textarea
              className="internshipform-inputs"
              name="offers"
              placeholder="Describe what your company offers to interns"
            />
            <div className="formatted-offers">
              {/* {formatList(internship.offers)} */}
            </div>
          </div>
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-internship"
            >
              Cancel
            </button>
            <button type="submit" className="create-internship">
              {/* {id ? "Edit Internship" : "Add Internship"} */}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default EditProfile