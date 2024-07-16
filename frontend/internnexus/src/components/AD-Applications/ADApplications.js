import React, { useState, useEffect } from "react";
import api from "../../api.js";
import "../AD-Applications/ADApplications.scss";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar/Sidebar.js";

const ADInternship = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getAllInternshipApplications();
  }, []);

  const getAllInternshipApplications = async () => {
    try {
      const response = await api.get("/internshipapplication");
      setApplications(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  const deleteApplication = async (id) => {
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
        await api.delete("/internshipapplication/" + id);
        Swal.fire({
          title: "Deleted!",
          text: "The application has been deleted.",
          icon: "success",
        });
        getAllInternshipApplications();
      }
    } catch (err) {
      console.error("Failed to delete application", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete application",
        icon: "error",
      });
    }
  };

  return (
    <div className="admininternshipmaindiv">
      <Sidebar />
      <div className="admindashboardrightside">
        <h4 style={{ alignSelf: "center", marginTop: "5rem" }}>
          Admin Dashboard for Applications
        </h4>
        <table
          className="adapplications-table table"
          style={{ width: "80%", alignSelf: "center" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Internship ID</th>
              <th>Username</th>
              <th>Apply Date</th>
              <th>CV</th>
              <th>Additional Message</th>
              <th style={{ width: "50px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td>{application._id}</td>
                <td>{application.internshipID}</td>
                <td>{application.username}</td>
                <td>
                  {new Date(application.applyDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{application.cv}</td>
                <td>{application.additionalMessage}</td>
                <td style={{ display: "flex", padding: "5px 10px" }}>
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: "10px" }}
                    onClick={() => deleteApplication(application._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ADInternship;
