import React from "react";
import "../src/styles/App.css";
import NavigationBar from "./components/NavigationBar.js";
import Signup from "./components/SignUp/Signup.js";

import Students from "./components/Students/Students.js";
import Home from "./components/Home/Home.js";
import Login from "./components/Login.js";
import Footer from "./components/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import Internships from "./components/Internships/Internships.js";
import Login from "./components/Login.js";
import Students from "./components/Students/Students.js";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
        {/* <Home /> */}
        {/* <Login /> */}
        <NavigationBar />
        <Signup></Signup>

        {/* <Students /> */}
      </body>
      <Home />
      <Students />
      <Login />
      <Footer />
      {/* <Home /> */}
      {/* <Students /> */}
      {/* <Login /> */}
      <Internships />
      <Footer />
    </div>
  );
}

export default App;
