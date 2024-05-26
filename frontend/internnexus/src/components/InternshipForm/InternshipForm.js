import React, { useState, useEffect } from "react";
import "./InternshipForm.scss";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../src/api";

function InternshipForm() {
  const history = useHistory();
  const { id } = useParams();
  //Forma ku ruhen t'dhanat
  const [internship, setInternship] = useState({
    image: "",
    title: "",
    type: "",
    location: "",
    duration: "",
    requirements: "",
    offers: "",
  });

  useEffect(() => {
    // qikjo perdoret me i bo fetch Internships
    if (id) {
      const fetchInternship = async () => {
        try {
          const response = await api.get("/internships/" + id);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", internship.image);
    formData.append("title", internship.title);
    formData.append("type", internship.type);
    formData.append("location", internship.location);
    formData.append("duration", internship.duration);
    formData.append("requirements", internship.requirements);
    formData.append("offers", internship.offers);

    try {
      const response = await api.post("/internships", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      history.push("/internships");
      alert("Internship created successfully");
    } catch (error) {
      console.error(error);
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
          <li key={index}>❖ {item.trim()}</li>
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
            Fill out the form below to create an internship listing
          </p>
          <p className="internshipform-labels">
            Include an image of your Company
          </p>
          <div className="form-group">
            <input
              type="file"
              className="internshipform-inputs"
              name="image"
              onChange={(e) =>
                setInternship({ ...internship, image: e.target.files[0] })
              }
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Internship Title</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="title"
              placeholder="Enter internship title"
              onChange={(e) =>
                setInternship({ ...internship, title: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Internship Type</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="type"
              placeholder="e.g. Full-time, Part-time"
              onChange={(e) =>
                setInternship({ ...internship, type: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Location</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="location"
              placeholder="Enter internship location"
              onChange={(e) =>
                setInternship({ ...internship, location: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Duration</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="duration"
              placeholder="Enter internship duration (e.g. 6 months)"
              onChange={(e) =>
                setInternship({ ...internship, duration: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="internshipform-labels">Requirements</label>
            <textarea
              className="internshipform-inputs"
              name="requirements"
              placeholder="List the requirements for the internship, separated by new lines"
              onChange={(e) =>
                setInternship({ ...internship, requirements: e.target.value })
              }
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
              placeholder="Describe what your company offers to interns, separated by new lines"
              onChange={(e) =>
                setInternship({ ...internship, offers: e.target.value })
              }
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
            <button
              type="submit"
              className="create-internship"
              onClick={handleSubmit}
            >
              Create Internship
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipForm;
