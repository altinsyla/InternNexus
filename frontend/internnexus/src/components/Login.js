import React from 'react';

// import { Button } from 'react-bootstrap';
// qikjo metod osht ma e keqe per me marr componente mrena bootstrapit, metod ma e mir osht 
// import Button from 'react-bootstrap/Button'; 
// kjo e thirr veq Buttonin nkrahasim me ata ma nalt e cila e thirr KREJT librarin, ndikon ne performance edhe ne madhesi

import { SiFacebook } from "react-icons/si";

import { FcGoogle } from "react-icons/fc";
import { useHistory } from 'react-router-dom';
import internnexus from '../imgsrc/internnexus.png';
import '../styles/App.css';




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

      <div className='btn-google-fb'>

        <button className='googlebtn'>
      <FcGoogle className='googleicon'/>
          Login with Google</button>

          <buton className='facebookbtn'>
          <SiFacebook className='fbicon' />

            Login With Facebook</buton>
      </div>
        </div>
    </div>
  );
}

export default Login;