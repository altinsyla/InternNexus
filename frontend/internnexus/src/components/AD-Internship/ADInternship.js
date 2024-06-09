import React, { useState, useEffect } from "react";
import api from "../../api";
import "./ADInternship.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const ADInternship = () => {
  const [internships, setInternships] = useState([]);
  const [singleInternship, setSingleInternship] = useState({
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
  const [show, setShow] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const { id } = useParams();

  const getAllInternships = async () => {
    try {
      const response = await api.get("/internships");
      setInternships(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  const getSingleInternship = async (id) => {
    try {
      const response = await api.get("/internships/" + id);
      setSingleInternship({
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleInternship({ ...singleInternship, [name]: value });
  };

  const handleFileChange = (e) => {
    setSingleInternship({ ...singleInternship, image: e.target.files[0] });
  };

  useEffect(() => {
    getAllInternships();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (singleInternship.image) {
      formData.append("image", singleInternship.image);
    }
    formData.append("username", singleInternship.username);
    formData.append("title", singleInternship.title);
    formData.append("type", singleInternship.type);
    formData.append("location", singleInternship.location);
    formData.append("duration", singleInternship.duration);
    formData.append("requirements", singleInternship.requirements);
    formData.append("offers", singleInternship.offers);
    formData.append("category", singleInternship.category);

    try {
      if (isEditing && id) {
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
      setShow(false);
      setisEditing(false);
      getAllInternships();
      setSingleInternship({
        image: null,
        title: "",
        type: "",
        location: "",
        duration: "",
        requirements: "",
        offers: "",
        category: "",
      });
    } catch (error) {
      console.error("Internship save error", error);
    }
  };

  const deleteInternship = async (id) => {
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
        await api.delete("/internships/" + id);
        Swal.fire({
          title: "Deleted!",
          text: "The internship has been deleted.",
          icon: "success",
        });
        getAllInternships();
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
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Registered Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship) => (
              <tr key={internship._id}>
                <td>{internship._id}</td>
                <td>{internship.title}</td>
                <td>{internship.category}</td>
                <td>{internship.type}</td>
                <td>{internship.location}</td>
                <td>{internship.duration}</td>
                <td>
                  {new Date(internship.registeredDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </td>
                <td style={{ display: "flex", gap: "1rem" }}>
                  <button
                    className="btn btn-warning mr-2"
                    style={{ fontSize: "10px" }}
                    onClick={() => {
                      getSingleInternship(internship._id);
                      setisEditing(true);
                      setShow(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mr-2"
                    style={{ fontSize: "10px" }}
                    onClick={() => deleteInternship(internship._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-success"
          onClick={() => {
            setShow(true);
            setisEditing(false);
          }}
        >
          Create Internship
        </button>
      </div>

      <Modal
        size="lg"
        show={show}
        aria-labelledby="example-modal-sizes-title-lg"
        centered={true}
        keyboard={true}
      >
        <Modal.Header
          closeButton
          onHide={() => {
            setShow(false);
            setSingleInternship({
              image: null,
              title: "",
              type: "",
              location: "",
              duration: "",
              requirements: "",
              offers: "",
              category: "",
            });
            setisEditing(false);
          }}
        >
          <Modal.Title id="example-modal-sizes-title-lg">
            Internship
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="modalform"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <label>Internship Image</label>
            <input
              type="file"
              className="internshipform-inputs"
              name="image"
              onChange={handleFileChange}
            />
            <label>Internship Title</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="title"
              placeholder="Enter internship title"
              value={singleInternship.title}
              onChange={handleChange}
            />
            <label>Internship Type</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="type"
              placeholder="e.g. Full-time, Part-time"
              value={singleInternship.type}
              onChange={handleChange}
            />
              <label className="internshipform-labels">
                Internship category
              </label>
              <select
                name="category"
                className="internshipform-inputs"
                value={singleInternship.category}
                onChange={handleChange}
              >
                <option value="">Select a Category</option>
                <option value="Front-End Developer">Front-End Developer</option>
                <option value="Back-End Developer">Back-End Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
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
                <option value="Blockchain Developer">
                  Blockchain Developer
                </option>
                <option value="IoT Developer">IoT Developer</option>
                <option value="Mobile Application Developer">
                  Mobile Application Developer
                </option>
                <option value="UI/UX Designer">UI/UX Designer</option>
              </select>
            <label>Location</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="location"
              placeholder="e.g. Prishtine, Vushtrri, Remote"
              value={singleInternship.location}
              onChange={handleChange}
            />
            <label>Duration</label>
            <input
              type="text"
              className="internshipform-inputs"
              name="duration"
              placeholder="e.g. 3 months, 6 months"
              value={singleInternship.duration}
              onChange={handleChange}
            />
            <label>Internship Requirements</label>
            <textarea
              className="internshipform-inputs"
              name="requirements"
              placeholder="List the requirements for the internship"
              value={singleInternship.requirements}
              onChange={handleChange}
            />
            <div>{formatList(singleInternship.requirements)}</div>
            <label>What We Offer</label>
            <textarea
              className="internshipform-inputs"
              name="offers"
              placeholder="Describe what your company offers to interns"
              value={singleInternship.offers}
              onChange={handleChange}
            />
            <div>{formatList(singleInternship.offers)}</div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setSingleInternship({
                image: null,
                title: "",
                type: "",
                location: "",
                duration: "",
                requirements: "",
                offers: "",
              });
              setisEditing(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ADInternship;
