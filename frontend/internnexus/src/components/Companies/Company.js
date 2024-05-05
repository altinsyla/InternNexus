import React from "react";
import "../Companies/Company.scss";
import Gjirafalab from "../Companies/gjirafalab.png";
import drenakusari from '../Companies/drenakusari.jpg';
import ardianhoxha from '../Companies/ardianhoxha.jpg';
import blerandstavileci from '../Companies/blerandstavileci.jpg';
import celiknimani from '../Companies/celiknimani.jpg';
import MentorsCard from "./MentorsCard";
import NavigationBar from "../NavigationBar";

function Company() {
  return (
    <div>
      <NavigationBar />
    <div className="mainDiv">
      <div className="imageDiv">
        <img src={Gjirafalab} alt="gjirafalab" className="companyLogo" />
        <p className="fontregular" style={{ marginLeft: "10%"}}>
          Gjirafa Lab is a startup factory, made for Internet entrepreneurs who
          lack access to resources and market. As a startup factory, the Lab
          will provide the space, mentoring, networking, technology, talent
          visibility, and funding to competent Internet entrepreneurs, creating
          solutions for the Kosovo, Albania, and FYR Macedonia market. Unlike
          others, Gjirafa Lab is made of people who have done it before. Gjirafa
          Lab is built by Gjirafa, Inc., assisted by the United States Agency
          for International Development (USAID), with the goal of building the
          Internet Economy in Kosovo and the region. Entrepreneurs will have an
          opportunity to transform their technology ideas/products into
          successful online businesses and solve real problems for society.
        </p>
      </div>
      <h2 className="meetmentors">MEET OUR MENTORS</h2>
      <div className="mentorscarddiv">
        <MentorsCard />
        <MentorsCard /> 
        <MentorsCard />
        <MentorsCard />
        <MentorsCard />
      </div>
    </div>
    </div>
  );
}

export default Company;
