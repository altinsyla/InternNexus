import React from "react";
import "../src/styles/App.css";
import NavigationBar from "./components/NavigationBar.js";
import Signup from "./components/SignUp/Signup.js";
import Home from "./components/Home/Home.js";
import Login from "./components/Login.js";
import Footer from "./components/Footer/Footer.js";
import Internships from "./components/Internships/Internships.js";
import Students from "./components/Students/Students.js";
import InternshipApply from "./components/InternshipApply/InternshipApply.js";
import Company from './components/Companies/Company.js';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
        <NavigationBar />
        {/* <Internships /> */}
        {/* <InternshipApply /> */}
        <Company />
      </body>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
