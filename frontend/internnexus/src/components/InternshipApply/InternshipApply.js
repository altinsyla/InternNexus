import React, { useState, useEffect } from "react";
import "../../components/InternshipApply/InternshipApply.scss";
import Footer from "../Footer/Footer.js";
import NavBar from "../NavBar/NavBar.js";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api.js";
import Swal from "sweetalert2";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { MdEuroSymbol } from "react-icons/md";
import deletebutton from '../../imgsrc/deletebutton.svg';
import editbutton from '../../imgsrc/editbuttonn.svg';
import applybutton from '../../imgsrc/applybutton.svg';

function InternshipApply() {
  const { id } = useParams();
  const history = useHistory();
  const [internship, setInternship] = useState(null);
  const [currentUser, setcurrentUser] = useState({});

  //Qikjo e merr Userin qe osht i kyqun momentalisht
  const getcurrentuser = async () => {
    try {
      const response = await api.get(
        `/user/${localStorage.getItem("username")}`
      );
      setcurrentUser(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await api.get(`/internships/${id}`);
        setInternship(response.data);
      } catch (err) {
        console.error("Failed to fetch internship details", err);
      }
    };

    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        await getcurrentuser();
      }
      await fetchInternship();
    };

    fetchData();
  }, [id]);

  const handleEdit = (id) => {
    history.push(`/internshipForm/${id}`);
  };

  const handleApply = () => {
    history.push(`/internshipapplyform/${id}`);
  };

  const deleteInternship = async () => {
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
        await api.delete(`/internships/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your internship has been deleted.",
          icon: "success",
        });
        history.push("/internships");
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

  if (!internship) {
    return <div>No internship found.</div>;
  }

  const formatList = (input) => {
    if (!input) return null;
    return input.split("\n").map((item, index) => <li key={index}>{item}</li>);
  };

  return (
    <div>
      <NavBar />
      <div className="applymainContainer">
        <div className="applyCard">
          <img
            src={`http://localhost:5001/images/${internship.image}`}
            alt="Company Logo"
            className="applycompanyLogo"
          />
          <div className="specifications">
            <div>
              <h4 className="title-specs">{internship.title}</h4>
            </div>
            <div className="specifiations-div">
              <h6 className="specifiations-details">
                <MdEuroSymbol className="apply-icons" /> {internship.salary}
              </h6>
              <h6 className="specifiations-details">
                <LiaBusinessTimeSolid className="apply-icons" />{" "}
                {internship.type}
              </h6>
              <h6 className="specifiations-details">
                <IoTimeOutline className="apply-icons" /> {internship.duration}
              </h6>
              <h6 className="specifiations-details">
                <IoLocationOutline className="apply-icons" />{" "}
                {internship.location}
              </h6>
            </div>
            <div className="edit-delete-btn">
              {(internship.username === currentUser.username &&
                currentUser.role === 2) ||
              currentUser.role === 3 ? (
                <>
                  <button
                    className="btn-apply"
                    onClick={() => handleEdit(internship._id)}
                  >
                    <img src={editbutton} className="svg-icons"></img>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={deleteInternship}>
                  <img src={deletebutton} className="svg-icons"></img>
                    Delete
                  </button>
                </>
              ) : (
                currentUser.role === 1 && (
                  <button className="btn-apply" onClick={handleApply}>
                     <img src={applybutton} className="svg-icons"></img>
                    Apply Now
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <div className="intapplydescription">
          <p className="int-requirements">Internship Requirements</p>
          <ul>{formatList(internship.requirements)}</ul>
        </div>
        <div className="intapplydescription">
          <p className="int-requirements">What we offer</p>
          <ul>{formatList(internship.offers)}</ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipApply;
