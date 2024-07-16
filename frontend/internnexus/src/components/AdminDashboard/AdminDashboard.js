import React, { useState, useEffect } from "react";
import api from "../../api";
import "./AdminDashboard.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Sidebar from '../Sidebar/Sidebar.js';
import useGlobalFunctions from "../globalFunctions.js";

const AdminDashboard = () => {
  const { getCurrentUser } = useGlobalFunctions();


  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  const getAllUsers = async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  const getSingleUser = async (id) => {
    try {
      const response = await api.get("/user/" + id);
      setSingleUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setSingleUser({ ...singleUser, [name]: value });
  };

  useEffect(() => {
    getAllUsers();
    setcurrentUser(getCurrentUser());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing){
        api
          .patch("/user/" + singleUser._id, singleUser)
          .then((response) => {
            Swal.fire({
              title: "Edit Success!",
              icon: "success",
            });
            setShow(false);
            setisEditing(false);
            getAllUsers();
            setSingleUser([]);
          });
      } else {
        api
          .post("/user/", singleUser)
          .then((response) => {
            Swal.fire({
              title: "User Added Successfully!",
              icon: "success",
            });
            setShow(false);
            getAllUsers();
            setSingleUser([]);
            setisEditing(false);
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.response.data.message,
              icon: "error",
            });
          });
      }
    } catch (error) {
      console.error("User save error", error.response.data);
    }
  };

  const deleteExpense = async (id) => {
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
        await api.delete("/user/" + id);
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
        });
        getAllUsers();
        setShow(false);
        setSingleUser([]);
        setisEditing(false);
      }
    } catch (err) {
      console.error("Failed to delete user", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete user",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div>
      <Sidebar />
      <h4 style={{width: "100%", marginLeft: "15%", marginTop: "1rem"}}>Admin Dashboard for Users</h4>
        <table className="admindashboard-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{width: "150px"}}>Buttons</th>
            </tr>
          </thead>
          <tbody>
            {users.map((users) => (
              <tr key={users._id}>
                <td>{users._id}</td>
                <td>{users.fullname}</td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>{users.role}</td>
                <td style={{ display: "flex", justifyContent: "space-between", padding: "5px 10px"}}>
                  <button
                    className="btn btn-warning mr-2"
                    style={{ fontSize: "10px" }}
                    onClick={() => {
                      getSingleUser(users.username);
                      setisEditing(true);
                      setShow(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger mr-2"
                    style={{ fontSize: "10px" }}
                    onClick={() => deleteExpense(users._id)}
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
          style={{width: "100", marginLeft: "15%", marginTop: "1rem"}}
          onClick={() => {
            setShow(true);
            setisEditing(false);
          }}
        >
          Create User
        </button>
      </div>

      <Modal
        size="sm"
        show={show}
        aria-labelledby="example-modal-sizes-title-sm"
        centered={true}
        keyboard={true}
      >
        <Modal.Header
          closeButton
          onHide={() => {
            setShow(false);
            setSingleUser([]);
            setisEditing(false);
          }}
        >
          <Modal.Title id="example-modal-sizes-title-sm">User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modalform" onSubmit={onSubmit}>
            <label>Full Name</label>
            <input
              placeholder="e.g. John Doe"
              type="text"
              value={singleUser.fullname}
              onChange={onChange}
              name="fullname"
            />

            <label>Username</label>
            <input
              placeholder="e.g. John1"
              type="text"
              onChange={onChange}
              value={singleUser.username}
              name="username"
            />

            <label>Email</label>
            <input
              placeholder="e.g. john.doe@gmail.com"
              type="text"
              onChange={onChange}
              value={singleUser.email}
              name="email"
            />

            {!isEditing ? (
              <>
                <label>Password</label>
                <input
                  placeholder="e.g. password"
                  type="password"
                  onChange={onChange}
                  value={singleUser.password}
                  name="password"
                />
              </>
            ) : (
              ""
            )}

            <label>Role</label>
            <input
              placeholder="e.g. 1"
              type="number"
              onChange={onChange}
              value={singleUser.role}
              name="role"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setSingleUser([]);
              setisEditing(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
