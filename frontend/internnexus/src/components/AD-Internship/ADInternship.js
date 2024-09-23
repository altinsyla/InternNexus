import React, { useState, useEffect } from "react";
import api from "../../api";
import "./ADInternship.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.js";

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
    salary: "",
    topics: [],
  });
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState("");
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getAllInternships = async () => {
    try {
      const response = await api.get("/internships");
      setInternships(response.data.internships);
      setLoading(false);
      console.log(response.data.internships)
    } catch (err) {
      console.log("You need to be logged in first!");
      setLoading(false);
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
        salary: response.data.salary,
      });
      setTopics(
        Array.isArray(response.data.topics) ? response.data.topics : []
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllInternships();
    if (isEditing && id) {
      getSingleInternship(id);
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleInternship({ ...singleInternship, [name]: value });
  };

  const handleFileChange = (e) => {
    setSingleInternship({ ...singleInternship, image: e.target.files[0] });
  };

  const handleTopicChange = (e) => {
    setCurrentTopic(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentTopic.trim()) {
        setTopics([...topics, currentTopic.trim()]);
        setCurrentTopic("");
      }
    }
  };

  const handleCancel = () => {
    setShow(false);
    setIsEditing(false);
    history.push("/adinternship");
  };

  const removeTopic = (indexToRemove) => {
    setTopics(topics.filter((_, index) => index !== indexToRemove));
  };

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
    formData.append("salary", singleInternship.salary);
    topics.forEach((topic) => {
      formData.append("topics[]", topic);
    });

    try {
      if (isEditing && id) {
        await api.put(`/internships/${id}`, formData, {
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
      setIsEditing(false);
      getAllInternships();
      setSingleInternship({
        username: localStorage.getItem("username"),
        image: null,
        title: "",
        type: "",
        location: "",
        duration: "",
        requirements: "",
        offers: "",
        category: "",
        salary: "",
        topics: [],
      });
      setTopics([]);
      getAllInternships();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admininternshipmaindiv">
      <Sidebar />
      <div className="admindashboardrightside">
        <h4 style={{ alignSelf: "center" }}>Admin Dashboard for Internships</h4>
        <button
          className="btn btn-success"
          style={{
            width: "fit-content",
            alignSelf: "center",
            marginBottom: "2rem",
          }}
          onClick={() => {
            setShow(true);
            setIsEditing(false);
          }}
        >
          Create Internship
        </button>
        <table
          className="adinternship-table table"
          style={{ width: "80%", alignSelf: "center" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Salary</th>
              <th>Registered Date</th>
              <th>Topics</th>
              <th>Edit</th>
              <th>Delete</th>
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
                <td>{internship.salary}</td>
                <td>
                  {new Date(internship.registeredDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </td>
                <td>{internship.topics && internship.topics.join(", ")}</td>
                <td>
                  <button
                    className="btn btn-warning mr-2"
                    style={{ fontSize: "10px" }}
                    onClick={() => {
                      getSingleInternship(internship._id);
                      setIsEditing(true);
                      setShow(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
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

        <Modal
          size="lg"
          show={show}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-lg">
              {isEditing ? "Edit Internship" : "Create Internship"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="addinstructor-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter internship title"
                  value={singleInternship.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  placeholder="Enter internship type"
                  value={singleInternship.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Enter internship location"
                  value={singleInternship.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  className="form-control"
                  name="duration"
                  placeholder="Enter internship duration"
                  value={singleInternship.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  className="form-control"
                  name="requirements"
                  placeholder="Enter internship requirements"
                  value={singleInternship.requirements}
                  onChange={handleChange}
                  required
                ></textarea>
                <div className="formatted-requirements">
                  {formatList(singleInternship.requirements)}
                </div>
              </div>
              <div className="form-group">
                <label>Offers</label>
                <textarea
                  className="form-control"
                  name="offers"
                  placeholder="Enter internship offers"
                  value={singleInternship.offers}
                  onChange={handleChange}
                  required
                ></textarea>
                <div className="formatted-requirements">
                  {formatList(singleInternship.offers)}
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  placeholder="Enter internship category"
                  value={singleInternship.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  placeholder="Enter internship salary"
                  value={singleInternship.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Topics</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentTopic}
                  onChange={handleTopicChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Press Enter to add a topic"
                />
                <div className="topic-list">
                  {topics.map((topic, index) => (
                    <span key={index} className="topic-item">
                      {topic}{" "}
                      <button
                        type="button"
                        onClick={() => removeTopic(index)}
                        className="remove-topic"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="adint-buttons">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancel}
                  style={{ width: "150px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "150px" }}
                >
                  {isEditing ? "Save Changes" : "Create Internship"}
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ADInternship;
