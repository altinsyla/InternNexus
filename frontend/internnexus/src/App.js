import React from 'react';
import './App.css';
import internnexus from './imgsrc/internnexus.png';
import { Nav, Container, Navbar } from 'react-bootstrap';


function App() {
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

export default App;
