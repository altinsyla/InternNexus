import React, { useState, useEffect } from "react";
import "./test.css";
import api from "../../api";

function Test() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
    } catch (err) {
      console.log("You need to be logged in first!");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {/* <button onClick={() => console.log(users)}>Log Expenses</button> */}
      {users.map((user) => (
        <table>
          <tr className="contentrow" key={user._id}>
            <td>{user.username}</td>
            <td>{user.fullname}</td>
            <td>{user.email}</td>
          </tr>
        </table>
      ))}
    </div>
  );
}

export default Test;
