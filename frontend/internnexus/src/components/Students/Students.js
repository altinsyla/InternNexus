import React from 'react';
import '../Students/Students.scss'
import AltinSyla from '../Students/AltinSyla.jpg';
import { SiReact, SiExpress, SiMongodb, SiNodedotjs, SiMysql, SiFigma } from 'react-icons/si';
import NavBar from "../NavBar/NavBar.js";
import Footer from '../Footer/Footer.js';

function Students() {
// const [clicked, setClicked] = useState('false');

//   const handleClick = () => {
//     setClicked(true);
//     setTimeout(() => setClicked(false), 800);
//   };

  return (
    <div>
      <NavBar />
      <div className='studentBody'>
        <div className="studentContent">
          <div style={{flex: 1}}>
            <p className='studentName'>Altin Syla</p>
            <p className='studentEducation'>Universiteti "Isa Boletini" - Mitrovice</p>
            <p className='studentSkills'>Full Stack Web Developer</p>
            <p className='studentDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie vehicula elementum. Morbi semper varius mauris non iaculis. Etiam tincidunt augue risus, ac dapibus magna pharetra vel. Nunc a est sed nunc ornare molestie pulvinar eu felis. Nullam felis leo, porttitor ac nunc molestie, eleifend vehicula ex. Proin vulputate quam ut libero tincidunt egestas. Suspendisse mattis eros vel urna ultricies, sit amet maximus dui pulvinar. Vivamus commodo vestibulum quam. Etiam eget odio quis orci cursus tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas sagittis sodales consequat. Nunc tincidunt ipsum velit, vel posuere massa varius a. Donec ac ligula ipsum. Maecenas id lectus vitae dolor porttitor vulputate a nec ligula.</p>
          </div>
          <div className='studentBanner'>
          <img src={AltinSyla} 
          alt="studentPhoto"
          className='studentPhoto' />
           {/* <button
      className='buttoncontact'
    >
      GET STARTED
    </button> */}
          </div>
        </div>
        <p className='studentSkills'>Skills</p>
        <div className="skill-item">
        <SiReact className="skill-icon" />
        <SiMongodb className="skill-icon" />
        <SiExpress className="skill-icon" />
      </div>
      <div className="skill-item">
        <SiNodedotjs className='skill-icon' />
        <SiFigma className="skill-icon" />
        <SiMysql className="skill-icon" />
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Students;

