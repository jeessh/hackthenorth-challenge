// import React, {useEffect, useState} from 'react'
import React from "react";
import hacker from "../../assets/hacker.png";
import visit from "../../assets/traveler.png";
import "./index.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  // const handleLoginSubmit = () => {

  // }

  const handleLoginClick = async () => {
    if (isAuthenticated) {
      navigate("/events");
    } else {
      await loginWithRedirect({
        appState: { returnTo: "/events" },
      });
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
