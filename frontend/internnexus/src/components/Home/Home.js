import "./Home.scss";
import NavBar from "../NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Studentcard from "./Card";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";


// routes
//navbarin ndreqe
// responsive
// fix bg color






function Home() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div id="body" data-theme={isDark ? "dark" : "light"}>
      <NavBar />
      <div id="container">
        <div className="banner">
          <div className="banner_main">
            {/* */}
            <div className="banner_maindiv">
              <div>
                <h1 className="fontbold">
                  {/*fontbold osht ni klass mrena _globals qe e bon font-family = poppins_bold */}
                  Quickest way to hire fit remote developer
                </h1>
                <br></br>
                <p className="fontthin banner_maindiv_p">
                  Start your team with developers of your needs.
                </p>
              </div>
              <div className="banner_buttondiv">
                <button
                  className="button_registercompany"
                  onClick={() => setIsDark(true)}
                >
                  Register your company
                </button>
                  <Link to='/internships' className="linknodecoration button_findintern">Find an Internship</Link>
              </div>
            </div>
          </div>
          <div className="banner_bannerPhoto">
            <img
              src={require("./img/man_laptop.jpeg")}
              alt="Man with laptop"
              style={{ height: 400 }}
            ></img>
          </div>
        </div>

        <h1 className="poweredby">POWERED BY</h1>

        <div className="ph_grid">
          <div className="poweredbygrid">
            <img
              src={require("./img/gjirafalab.png")}
              className="gridphotos img1"
              alt="company"
            ></img>
            <img
              src={require("./img/frakton.png")}
              className="gridphotos img2"
              alt="company"
            ></img>
            <img
              src={require("./img/ict.png")}
              className="gridphotos img3"
              alt="company"
            ></img>
            <img
              src={require("./img/solaborate.png")}
              className="gridphotos img4"
              alt="company"
            ></img>
            <img
              src={require("./img/starlabs.png")}
              className="gridphotos img5"
              alt="company"
            ></img>
            <img
              src={require("./img/xponent.jpg")}
              className="gridphotos img6"
              alt="company"
            ></img>
          </div>
        </div>
        <h1 className="poweredby">FIND STUDENTS</h1>
        <div className="studentcarddiv">
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
          <Studentcard />
        </div>
        <h1
          className="fontblack poweredby"
          style={{ textAlign: "center"}}
        >
          MEET THE DEVS
        </h1>
        <div className="devcarddiv">
          <Card style={{ width: "18rem", height: '500px'}} className="devcard">
            <Card.Img variant="top" src={require("./img/AltinSyla.jpg")} style={{height: "70%", objectFit: 'cover'}}/>
            <Card.Body style={{height: "30%"}}>
              <Card.Title className="fontmedium">Altin Syla</Card.Title>
              <Card.Text className="cardText fontthin">
              Full Stack Web Developer
              </Card.Text>
              <Link to='/student' className="button_details linknodecoration" >Details</Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem", height: '500px' }} className="devcard">
            <Card.Img variant="top" src={require("./img/HakifKadriu.jpg")} style={{height: "70%", objectFit: 'cover'}}/>
            <Card.Body style={{height: "30%"}}>
              <Card.Title className="fontmedium">Hakif Kadriu</Card.Title>
              <Card.Text className="cardText fontthin">
              Full Stack Web Developer
              </Card.Text>
              <Link to='/student' className="button_details linknodecoration" >Details</Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem", height: '500px'  }} className="devcard">
            <Card.Img variant="top" src={require("./img/FlamurIsa.jpg")} style={{height: "70%", objectFit: 'cover'}}/>
            <Card.Body style={{height: "30%"}}>
              <Card.Title className="fontmedium">Flamur Isa</Card.Title>
              <Card.Text className="cardText fontthin">
              Full Stack Web Developer
              </Card.Text>
              <Link to='/student' className="button_details linknodecoration" >Details</Link>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
