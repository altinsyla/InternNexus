import React, { useState, useEffect } from "react";
import "./InternshipForm.scss";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../src/api";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";

function InternshipForm() {
  const history = useHistory();
  const { id } = useParams();
  const [internship, setInternship] = useState({
    image: null,
    title: "",
    type: "",
    location: "",
    duration: "",
    requirements: "",
    offers: "",
  });

  useEffect(() => {
    if (id) {
      const fetchInternship = async () => {
        try {
          const response = await api.get(`/internships/${id}`);
          setInternship({
            image: response.data.image,
            title: response.data.title,
            type: response.data.type,
            location: response.data.location,
            duration: response.data.duration,
            requirements: response.data.requirements,
            offers: response.data.offers,
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
    formData.append("title", internship.title);
    formData.append("type", internship.type);
    formData.append("location", internship.location);
    formData.append("duration", internship.duration);
    formData.append("requirements", internship.requirements);
    formData.append("offers", internship.offers);

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
          text: "Internship succesfully created!",
          icon: "success",
        });
      }
      history.push("/internships");
    } catch (error) {
      console.error("Internship save error", error);
    }
  };

  const handleCancel = () => {
    history.push("/home");
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
