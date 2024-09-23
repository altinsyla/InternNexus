import "./Card.scss";
import "../../styles/_globals.scss";
import React, { useState, useEffect } from "react";
import api from "../../api.js";
import { useParams, useHistory, Link } from "react-router-dom";

function Card({username}) {
  const [user, setUser] = useState([]);


  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await api.get(`/user/${username}`);
        setUser(response.data);
      } catch (err) {
        console.log("Failed to fetch user info!");
      }
    };

    fetchInternship();
  }, [username]);


  return (
    <div className="cardcontainer">
      <img src={`https://internnexus.onrender.com/userimages/${user.image}`} className="cardimg"></img>

      <div className="cardbody">
        <div className="studentname fontbold">{user.fullname}</div>
        <div className="studentskills fontthin">Full Stack Developer</div>
        <div className="cardbuttondiv">
          <Link to= {"/student/" + `${username}`} className="cardbutton linknodecoration" >Details</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
