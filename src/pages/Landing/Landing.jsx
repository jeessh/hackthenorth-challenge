import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import gear from "../../assets/setting.png";
import "./index.css";

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

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
    <main className="welcomeContainer">
      <img src={gear} className="welcomeGear" alt="gear" />
      <div className="welcomeContent">
        <h1 className="welcomeHeader">Welcome to</h1>
        <div className="hackTheNorthWrapper">
          <h1 className="HTN">HACK</h1>
          <h1 className="HTN HTNOutline">THE</h1>
          <h1 className="HTN">NORTH</h1>
        </div>
        <div className="hackTheNorthBackText">2021</div>
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
