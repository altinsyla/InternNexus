import React from "react";
import "../src/styles/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom"; // per linqe

// Pages
import Home from "./components/Home/Home.js";
import Login from './components/Login.js';
import Signup from './components/SignUp/Signup.js'; 
import Signup2 from './components/SignUp2/SignUp2.js'; 
import Student from './components/Students/Students.js'; 
import Internships from './components/Internships/Internships.js'; 
import InternshipsApply from './components/InternshipApply/InternshipApply.js'; 
import Companies from './components/Companies/Company.js'; 
import NavBar from "./components/NavBar/NavBar.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/create">
          <Signup2 />
        </Route>

        <Route exact path="/student">
          <Student />
        </Route>

        <Route exact path="/internships">
          <Internships />
        </Route> 

        <Route exact path="/apply">
          <InternshipsApply />
        </Route> 

        <Route exact path="/companies">
          <Companies />
        </Route> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
