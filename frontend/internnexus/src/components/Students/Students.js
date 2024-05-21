import React from "react";
import "../Students/Students.scss";
import AltinSyla from "../Students/AltinSyla.jpg";
import NavBar from "../NavBar/NavBar.js";
import Footer from "../Footer/Footer.js";

// boni me props
// marginen te student search
// bone responsive

function Students() {
  return (
    <div className="studentcontainer">
      <NavBar />
      <div className="utilitycontainer studentbanner">
        <div className="studentbannerleftside">
          <div className='studentUsername'>
            <h2 style={{ fontFamily: "poppins_bold", marginBottom: 0 }}>
              Altin Syla
            </h2>
            <h6 className="fontregular">altins7</h6>
          </div>
          <h4
            className="fontregular"
            style={{
              marginTop: "4rem",
              marginBottom: "1.5rem",
              borderBottom: "1px solid black",
              width: "fit-content",
            }}
          >
            About Me
          </h4>
          <p className="fontthin">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            molestie vehicula elementum. Morbi semper varius mauris non iaculis.
            Etiam tincidunt augue risus, ac dapibus magna pharetra vel. Nunc a
            est sed nunc ornare molestie pulvinar eu felis. Nullam felis leo,
            porttitor ac nunc molestie, eleifend vehicula ex. Proin vulputate
            quam ut libero tincidunt egestas. Suspendisse mattis eros vel urna
            ultricies, sit amet maximus dui pulvinar. Vivamus commodo vestibulum
            quam. Etiam eget odio quis orci cursus tristique. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Maecenas sagittis sodales consequat. Nunc tincidunt ipsum
            velit, vel posuere massa varius a. Donec ac ligula ipsum. Maecenas
            id lectus vitae dolor porttitor vulputate a nec ligula.
          </p>
        </div>

        <div className="studentbannerrightside">
          <img src={AltinSyla} alt="studentPhoto" className="studentPhoto" />
        </div>
      </div>
      <div className="studentskillscontainer utilitycontainer">
        <h4
          className="fontregular"
          style={{
            marginTop: "4rem",
            borderBottom: "1px solid black",
            width: "fit-content",
          }}
        >
          Skills
        </h4>
        <table className="skillstable">
          <tr>
            <td>Software Developer </td>
            <td>Web Developer </td>
            <td>Full Stack Developer </td>
            <td>Full Stack Developer </td>
            <td>Full Stack Developer </td>
            <td>Full Stack Developer </td>
            <td>Full Stack Developer </td>
            <td>Full Stack Developer </td>
            <td>Web Developer </td>
          </tr>
        </table>
      </div>
      <div className="studenteducationscontainer utilitycontainer">
        <h4
          className="fontregular"
          style={{
            marginTop: "10rem",
            borderBottom: "1px solid black",
            width: "fit-content",
          }}
        >
          Education
        </h4>
        <table className="educationstable">
          <tr>
            <th>University</th>
          </tr>
          <tr>
            <td>Computer Science at University “Isa Boletini” - Mitrovice</td>
          </tr>
        </table>

        <table className="educationstable">
          <tr>
            <th>High School</th>
          </tr>
          <tr>
            <td>Gjimnazi “Eqrem Qabej” - Vushtrri</td>
          </tr>
        </table>

        <table className="educationstable">
          <tr>
            <th>Elementary School</th>
          </tr>
          <tr>
            <td>SHFMU “Hasan Prishtina” - Millosheve</td>
          </tr>
          <tr>
            <td>SHFMU “Hasan Prishtina” - Millosheve</td>
          </tr>
        </table>

        <table className="educationstable">
          <tr>
            <th>Courses</th>
          </tr>
          <tr>
            <td>Course 1 </td>
          </tr>
          <tr>
            <td>Course 2 </td>
          </tr>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Students;
