import React, { useState } from "react";
import "./InternshipForm.scss";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useHistory } from "react-router-dom";

function InternshipForm() {
  const [requirements, setRequirements] = useState("");
  const [offer, setOffer] = useState("");
  const history = useHistory();

  const handleCancel = () => {
    history.push("/home");
  };

  const handleCreate = () => {
    history.push("/internships");
  }

  const handleRequirementsChange = (e) => {
    setRequirements(e.target.value);
  };

  const handleOfferChange = (e) => {
    setOffer(e.target.value);
  };

  const formatList = (input) => {
    if (input.trim() === "") return "";

    const listItems = input.split("\n");

    return (
      <ul>
        {listItems.map((item, index) => (
          <li key={index}>❖ {item.trim()}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="internship-form-container">
        <p className="internshipform-details">Internship Details</p>
        <p className="fill-out-form">
          Fill out the form below to create an internship listing
        </p>
        <p className="internshipform-labels">
          Include an image of your Company
        </p>
        <div className="form-group">
          <input type="file" className="internshipform-inputs" />
        </div>
        <form>
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
              placeholder="Enter internship location"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Duration</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="duration"
              placeholder="Enter internship duration (e.g. 6 months)"
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Requirements</label>
            <textarea
              className="internshipform-inputs"
              name="requirements"
              placeholder="List the requirements for the internship, separated by new lines"
              value={requirements}
              onChange={handleRequirementsChange}
            />
            <div className="formatted-requirements">
              {formatList(requirements)}
            </div>
          </div>
          <div className="form-group">
            <label className="internshipform-labels">What We Offer</label>
            <textarea
              className="internshipform-inputs"
              name="offer"
              placeholder="Describe what your company offers to interns, separated by new lines"
              value={offer}
              onChange={handleOfferChange}
            />
            <div className="formatted-offer">{formatList(offer)}</div>
          </div>
          <div className="form-buttons">
            <button className="cancel-internship" onClick={handleCancel}>Cancel</button>
            <button className="create-internship" onClick={handleCreate}>Create Internship</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipForm;
