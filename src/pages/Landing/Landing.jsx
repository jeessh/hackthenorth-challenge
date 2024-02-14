import React, { useEffect, useState } from "react";
import hacker from "../../assets/hacker.png";
import visit from "../../assets/traveler.png";
import gear from "../../assets/setting.png";
import "./index.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const handleScroll = () => {
    setOffset(window.scrollY);
  };
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
    <main style={{ backgroundColor: `var(--darkbg)`, overflow: "hidden" }}>
      <section
        className="welcomeContainer"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <img
          src={gear}
          className="welcomeGear"
          alt="gear"
          style={{ transform: `translateY(${0.25 * offset}px) rotateZ(${0.1 * offset}deg)` }}
        />
        <div className="welcomeContent">
          <h1 className="welcomeHeader">Welcome to</h1>
          <div className="hackTheNorthWrapper">
            <h1 className="HTN">HACK</h1>
            <h1
              className="HTN HTNOutline"
              style={{ transform: `translateY(${0.1 * offset}px)` }}
            >
              THE
            </h1>
            <h1
              className="HTN"
              style={{ transform: `translateY(${0.2 * offset}px)` }}
            >
              NORTH
            </h1>
          </div>
          <div
            className="hackTheNorthBackText"
            style={{ transform: `translateY(${-0.21 * offset}px)` }}
          >
            2021
          </div>
        </div>
      </section>
      <section className="landingCardContainer">
        <div className="temp">
          <div className="landingCard" onClick={handleLoginClick}>
            <img src={hacker} className="landingIcon" alt="logo" />
            <h1 className="landingHeader">Hacker</h1>
          </div>
          <div className="landingCard" onClick={handleVisitClick}>
            <img src={visit} className="landingIcon" alt="logo" />
            <h1 className="landingHeader">Visitor</h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
