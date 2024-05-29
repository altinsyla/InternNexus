import React from 'react'
import { Link } from 'react-router-dom'
import Errori from '../imgsrc/not-found.svg';
import './Error.css';

const Error = () => {
  return (
        <div className='error-style1'>
            <img src={Errori} alt='not found' className='imageerror'/>
            <h1>Oh!Faqja nuk u gjet!</h1>
            <p style={{fontSize: '1.5rem'}}>Ju lutem shkruani adresen e sakt </p>
            <p><Link to='/'>Kthehu</Link></p>
    </div>
  )
}

export default Error;