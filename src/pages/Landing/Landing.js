// import React, {useEffect, useState} from 'react'
import React, {useState, useEffect} from 'react'
import login from '../../assets/password.png'
import visit from '../../assets/visitor.png'
import './index.css'
import {useNavigate} from 'react-router-dom'

const Landing = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem('loggedIn'));
    if (logged) {
      setLoggedIn(true);
    }
  }, [])

  const navigate = useNavigate();

  // const handleLoginSubmit = () => {
    
  // }

  const handleLoginClick = () => {
    if (LoggedIn) {
      navigate('/events');
    } else {
      navigate('/login');
    }
  }

  const handleVisitClick = () => {
    navigate('/events');
  }

  return (

    <section className='landingCardContainer'>
      <div className='landingCard' onClick={handleLoginClick}>
        <img src={login} className='landingIcon' alt='logo' />
        <h1 className='landingHeader'>landing</h1>
      </div>
      <div className='landingCard' onClick={handleVisitClick}>
      <img src={visit} className='landingIcon' alt='logo' />
        <h1 className='landingHeader'>Visitor</h1>
      </div>
    </section>
  )
}

export default Landing