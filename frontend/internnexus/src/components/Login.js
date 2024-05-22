import React from 'react';

// import { Button } from 'react-bootstrap';
// qikjo metod osht ma e keqe per me marr componente mrena bootstrapit, metod ma e mir osht 
// import Button from 'react-bootstrap/Button'; 
// kjo e thirr veq Buttonin nkrahasim me ata ma nalt e cila e thirr KREJT librarin, ndikon ne performance edhe ne madhesi

import { FaGoogle } from "react-icons/fa";
import internnexus from '../imgsrc/internnexus.png';
import '../styles/App.css';
import { useHistory } from 'react-router-dom';



const fontiPerTekste = 'robot-font';

function Login() {

  const history = useHistory();

  const handleSignup = () => {
    history.push('/signupform');
  }

  return (
    <div>
        <div className='mainDivLogin'>
          <img src={internnexus} alt='Logo' className='logo'/>
          <p style={{fontWeight: 'bold',fontFamily:{fontiPerTekste},fontSize: 30 }}>Log in to InternNexus</p>
          <form>
            <input form='email' placeholder='Phone Number, email address' className='Inputs'/>
            <input type='password' placeholder='Password' className='Inputs'/>
          </form>
          <button className='loginBtn'>Log In</button>
          <div className='forgotPasswordDiv'>
          <a href='#' className='signuptext'>Forgot password?</a>
          <a href='#' className='signuptext' onClick={handleSignup}>Sign Up to InternNexus</a>
          </div>

          <div className='GoogleLogin'>
           
          <FaGoogle cursor='pointer'/>
       
            <a href='#' className='signuptext'> Login With Google</a>
          </div>
        </div>
    </div>
  );
}

export default Login;