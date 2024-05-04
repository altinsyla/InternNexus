import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/App.css";
import internnexus from "../imgsrc/internnexus.png";

function NavigationBar() {
  return (
    <div>
        <Navbar className="NavbarContainer">
          <Container className="LogoContainer">
            <img src={internnexus} alt="Logo" className="logo" />
          </Container>
          <Nav className="NavigationContainer">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#internships">INTERNSHIPS</Nav.Link>
            <Nav.Link href="#students">STUDENTS</Nav.Link>
            <button className="buttonLogin">LOG IN</button>
          </Nav>
        </Navbar>
    </div>
  );
}

export default NavigationBar;
