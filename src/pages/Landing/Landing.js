// import React, {useEffect, useState} from 'react'
import React, { useState, useEffect } from "react";
import hacker from "../../assets/hacker.png";
import visit from "../../assets/traveler.png";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedIn"));
    console.log(logged);
    if (logged) {
      setLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();

  // const handleLoginSubmit = () => {

  // }

  const handleLoginClick = () => {
    if (LoggedIn) {
      navigate("/events");
    } else {
      navigate("/login");
    }
  };

  const handleVisitClick = () => {
    navigate("/events");
  };

  return (
    <section className="landingCardContainer">
      <div className="landingCard" onClick={handleLoginClick}>
        <img src={hacker} className="landingIcon" alt="logo" />
        <h1 className="landingHeader">Hacker</h1>
      </div>
      <div className="landingCard" onClick={handleVisitClick}>
        <img src={visit} className="landingIcon" alt="logo" />
        <h1 className="landingHeader">Visitor</h1>
      </div>
    </section>
  );
};

export default Landing;
