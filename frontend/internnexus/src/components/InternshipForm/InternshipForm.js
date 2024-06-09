import React, { useState, useEffect } from "react";
import "./InternshipForm.scss";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../src/api";
import Swal from "sweetalert2";

function InternshipForm() {
  const history = useHistory();
  const { id } = useParams();
  const [internship, setInternship] = useState({
    username: localStorage.getItem("username"),
    image: null,
    title: "",
    type: "",
    location: "",
    duration: "",
    requirements: "",
    offers: "",
    category: "",
  });

  useEffect(() => {
    if (id) {
      const fetchInternship = async () => {
        try {
          const response = await api.get(`/internships/${id}`);
          setInternship({
            username: localStorage.getItem("username"),
            image: response.data.image,
            title: response.data.title,
            type: response.data.type,
            location: response.data.location,
            duration: response.data.duration,
            requirements: response.data.requirements,
            offers: response.data.offers,
            category: response.data.category,
          });
        } catch (error) {
          console.error("Error fetching internship data", error);
        }
      };
      fetchInternship();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternship({ ...internship, [name]: value });
  };

  const handleFileChange = (e) => {
    setInternship({ ...internship, image: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (internship.image) {
      formData.append("image", internship.image);
    }
    formData.append("username", internship.username);
    formData.append("title", internship.title);
    formData.append("type", internship.type);
    formData.append("location", internship.location);
    formData.append("duration", internship.duration);
    formData.append("requirements", internship.requirements);
    formData.append("offers", internship.offers);
    formData.append("category", internship.category);

    try {
      if (id) {
        await api.patch(`/internships/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire({
          text: "Internship successfully edited!",
          icon: "success",
        });
      } else {
        await api.post("/internships", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire({
          title: "Good job!",
          text: "Internship successfully created!",
          icon: "success",
        });
      }
      history.push("/internships");
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: "Fields needs to be filled!",
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    history.push("/home");
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
          <p className="internshipform-details">Internship Details</p>
          <p className="fill-out-form">
            Fill out the form below to {id ? "edit" : "create"} an internship
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
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Internship Title</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="title"
              placeholder="Enter internship title"
              value={internship.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Internship category</label>
            <select
              name="category"
              className="internshipform-inputs"
              value={internship.category}
              onChange={handleChange}
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
              value={internship.type}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Location</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="location"
              placeholder="e.g. Prishtine, Vushtrri, Remote"
              value={internship.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Duration</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="duration"
              placeholder="e.g. 3 months, 6 months"
              value={internship.duration}
              onChange={handleChange}
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
              value={internship.requirements}
              onChange={handleChange}
            />
            <div className="formatted-requirements">
              {formatList(internship.requirements)}
            </div>
          </div>
          <div className="form-group">
            <label className="internshipform-labels">What We Offer</label>
            <textarea
              className="internshipform-inputs"
              name="offers"
              placeholder="Describe what your company offers to interns"
              value={internship.offers}
              onChange={handleChange}
            />
            <div className="formatted-offers">
              {formatList(internship.offers)}
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
              {id ? "Edit Internship" : "Add Internship"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipForm;
