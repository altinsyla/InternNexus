import React from 'react';
import '../src/styles/App.css';
import Students from './components/Students/Students.js';
import Home from './components/Home/Home.js';
import Login from './components/Login.js';
import Footer from './components/Footer/Footer.js';
import Internships from './components/Internships/Internships.js';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Students /> */}
      {/* <Login /> */}
      <Internships />
      <Footer />
    </div>
  );
}

export default App;
