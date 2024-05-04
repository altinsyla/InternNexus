import React from "react";
import "../src/styles/App.css";
import Footer from "./components/Footer/Footer.js";
import SignUp2 from "./components/SignUp2/SignUp2.js";

function App() {
  return (
    
    <div className="App">
      {/* <NavigationBar /> */}
      {/* <Signup /> */}
      {/* <Students /> */}
      {/* <Home /> */}
      <SignUp2></SignUp2>
      {/* <Login /> */}
      {/* <Internships /> */}
      <Footer />
    </div>
  );
}

export default App;
