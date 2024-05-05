import "./Card.scss";
import "../../styles/_globals.scss";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="cardcontainer">
      <img src={require("./img/AltinSyla.jpg")} className="cardimg"></img>

      <div className="cardbody">
        <div className="studentname fontbold">Altin Syla</div>
        <div className="studentskills fontthin">Full Stack Web Developer</div>
        <div className="cardbuttondiv">
          <Link to='/student' className="cardbutton linknodecoration" >Details</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
