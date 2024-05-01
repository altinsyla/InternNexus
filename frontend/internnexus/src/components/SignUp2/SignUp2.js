import React, { useRef } from "react";
import { FaFileImage } from "react-icons/fa";
import "../../imgsrc/internnexus.png";
import "../SignUp2/SignUp2.css";


function SignUp2() {
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  return (
    <>
     <div className="logoDiv">
        <img
          src={require("../../../src/imgsrc/internnexus.png")}
          alt="logo1"
          className="logo1"
        />
      </div>
    <div className="mainDiv">
    <p className="first-p">Describe Yourself</p>
     
      <div onClick={handleImageClick} className="input-image">
        
      <FaFileImage className="icon" />

      <p className="second-p">Select file</p>
        <form>
        

          <input type="file" ref={inputRef} hidden />
        </form>
      </div>
      <textarea className="description-area" placeholder="Description..."></textarea>

    </div>
    </>
  );
}

export default SignUp2;
