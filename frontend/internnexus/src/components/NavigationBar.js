import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './styles/App.css';
import internnexus from '../imgsrc/internnexus.png';


function NavigationBar() {
  return (
    <body>
     <Navbar className='NavbarContainer'>
      <Container className='LogoContainer'>
        <img src={internnexus} alt="Logo" className='logo' />
      </Container>
      <Nav className="NavigationContainer">
        <Nav.Link href="#home">HOME</Nav.Link>
        <Nav.Link href="#features">INTERNSHIPS</Nav.Link>
        <Nav.Link href="#pricing">STUDENTS</Nav.Link>
        <button className='buttonLogin'>LOG IN</button>
      </Nav>
    </Navbar>
    </body>
  );
}

export default NavigationBar;
