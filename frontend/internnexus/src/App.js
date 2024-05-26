import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"; // per linqe
import "../src/styles/App.css";

// Pages
import Companies from './components/Companies/Company.js';
import Home from "./components/Home/Home.js";
import InternshipsApply from './components/InternshipApply/InternshipApply.js';
import Internships from './components/Internships/Internships.js';
import Login from './components/Login.js';
import MyProfile from "./components/MyProfile/MyProfile.js";
import Signup2 from './components/SignUp2/SignUp2.js';
import Student from './components/Students/Students.js';
import SearchStudents from "./components/SearchStudents/SearchStudents.js";
import InternshipForm from './components/InternshipForm/InternshipForm.js';
import SignUpForm from './components/SignUpForm/SignUpForm.js';

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

        <Route exact path="/signupform">
         <SignUpForm />
        </Route>

        <Route exact path="/create">
          <Signup2 />
        </Route>

        <Route exact path="/student">
          <Student />
        </Route>

        <Route exact path="/students">
          <SearchStudents />
        </Route>

        <Route exact path="/internships">
          <Internships />
        </Route> 

        <Route exact path="/apply/:id">
          <InternshipsApply />
          </Route>

        <Route exact path="/companies">
          <Companies />
        </Route> 
        <Route exact path="/myprofile">
          <MyProfile />
        </Route> 
        <Route exact path="/internshipForm">
          <InternshipForm />
        </Route> 

      </Switch>
    </BrowserRouter>
  );
}

export default App;
