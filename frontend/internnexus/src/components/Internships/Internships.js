import React from "react";
import "../../components/Internships/Internships.scss";
import "../../components/Internships/InternshipCard.js";
import InternshipCard from "../../components/Internships/InternshipCard.js";
import NavigationBar from "../NavigationBar.js";

function Internships() {
  return (
    <div>
      <NavigationBar />
      <body className="internship_body">
        <InternshipCard />
        <InternshipCard />
        <InternshipCard />
        <InternshipCard />
      </body>
    </div>
  );
}

export default Internships;
