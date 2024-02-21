import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import gear from "../../assets/GradientGear.webp";
import "./Landing.css";

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Selected Hacker
  const handleLoginClick = async () => {
    // User is already logged in:
    //  - Redirect straight to events page
    if (isAuthenticated) {
      navigate("/events");
    // User is not logged in:
    //  - Send to login page
    //  - Return to events page after login
    } else {
      await loginWithRedirect({
        appState: { returnTo: "/events" },
      });
    }
  };

  // Selected Visitor option
  const handleVisitClick = () => {
    navigate("/events");
  };

  return (
    <main className="welcomeContainer">
      <img src={gear} className="welcomeGear" alt="gear" />
      <div className="welcomeContent">
        <h1 className="HTN welcomeMsg">Welcome to</h1>
        <div className="hackTheNorthWrapper">
          <h1 className="HTN">HACK</h1>
          <h1 className="HTN HTNOutline">THE</h1>
          <h1 className="HTN">NORTH</h1>
        </div>
        <div className="hackTheNorthBackText">2024</div>
        <section className="landingCardContainer">
          <div className="landingCard" onClick={handleLoginClick}>
            <h1 className="landingHeader">Hacker 💻</h1>
          </div>
          <div className="landingCard" onClick={handleVisitClick}>
            <h1 className="landingHeader">Visitor 👋</h1>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Landing;
