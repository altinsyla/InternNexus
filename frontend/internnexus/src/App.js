import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"; // per linqe
import "../src/styles/App.css";

// Pages
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.js";
import Companies from "./components/Companies/Company.js";
import Error from "./components/Error/Error.js";
import Home from "./components/Home/Home.js";
import InternshipApply from "./components/InternshipApply/InternshipApply.js";
import InternshipForm from "./components/InternshipForm/InternshipForm.js";
import Internships from "./components/Internships/Internships.js";
import Login from "./components/Login.js";
import MyProfile from "./components/MyProfile/MyProfile.js";
import SearchStudents from "./components/SearchStudents/SearchStudents.js";
import SignUpForm from "./components/SignUpForm/SignUpForm.js";
import ADInternship from "./components/AD-Internship/ADInternship.js";
import Student from "./components/Students/Students.js";
import InternshipApplyForm from "./components/InternshipApply/InternshipApplyForm.js";
import ADApplications from "./components/AD-Applications/ADApplications.js";

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

        <Route exact path="/InternNexus">
          <Home />
        </Route>

        <Route exact path="/adinternship">
          <ADInternship />
        </Route>
        <Route exact path="/adapplications">
          <ADApplications />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/admindashboard">
          {" "}
          {/*FOR TESTING ONLY, DELETE AFTER ADMIN SESSION IS OVER */}
          <AdminDashboard />
        </Route>

        <Route exact path="/signupform">
          <SignUpForm />
        </Route>

        <Route exact path="/student">
          <Student />
        </Route>

        <Route exact path="/student/:username">
          <Student />
        </Route>

        <Route exact path="/students">
          <SearchStudents />
        </Route>

        <Route exact path="/internships">
          <Internships />
        </Route>

        {/* <Route exact path="/Internships/:id">
          <Internships />
        </Route> */}

        <Route exact path="/apply/:id">
          <InternshipApply />
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
        <Route exact path="/internshipapplyform">
          <InternshipApplyForm />
        </Route>

        <Route exact path="/internshipapplyform/:internshipID">
          <InternshipApplyForm />
        </Route>

        <Route exact path="/internshipForm/:id">
          <InternshipForm />
        </Route>

        <Route exact path="*">
          <Error />
        </Route>

        <Route exact path="/myprofile/:username">
          <MyProfile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
