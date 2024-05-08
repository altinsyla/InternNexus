import React from "react";
import "../Companies/Company.scss";
import Gjirafalab from "../Companies/gjirafalab.png";
// import drenakusari from '../Companies/drenakusari.jpg';
// import ardianhoxha from '../Companies/ardianhoxha.jpg';
// import blerandstavileci from '../Companies/blerandstavileci.jpg';
// import celiknimani from '../Companies/celiknimani.jpg';
import MentorsCard from "./MentorsCard";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer.js";

function Company() {
  return (
    <div>
      <NavBar />
      <div className="comp-mainDiv">
        <div className="comp-imageDiv">
          <img src={Gjirafalab} alt="gjirafalab" className="comp-companyLogo"/>
          <p
            className="pargraph-description"
          >
            Gjirafa Lab is a startup factory, made for Internet entrepreneurs
            who lack access to resources and market. As a startup factory, the
            Lab will provide the space, mentoring, networking, technology,
            talent visibility, and funding to competent Internet entrepreneurs,
            creating solutions for the Kosovo, Albania, and FYR Macedonia
            market. Unlike others, Gjirafa Lab is made of people who have done
            it before. Gjirafa Lab is built by Gjirafa, Inc., assisted by the
            United States Agency for International Development (USAID), with the
            goal of building the Internet Economy in Kosovo and the region.
            Entrepreneurs will have an opportunity to transform their technology
            ideas/products into successful online businesses and solve real
            problems for society.
            <br></br>
            <br></br>
            <a href="https://gjirafalab.com/">VISIT WEBSITE</a>
          </p>
        </div>
        <h2 className="comp-meetmentors">MEET OUR MENTORS</h2>
        <div className="comp-mentorscarddiv">
          <MentorsCard />
          <MentorsCard />
          <MentorsCard />
          <MentorsCard />
          <MentorsCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Company;
