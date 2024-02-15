import React, { useRef, useState } from "react";
import setting from "../../assets/setting.png";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import "./index.css";

const SideBar = ({ onClick }) => {
  const [click, setClick] = useState(true);
  const clickRef = useRef();
  const fillerRef = useRef();
  const gearRef = useRef();
  const { isAuthenticated } = useAuth0();
  const { logout, loginWithRedirect } = useAuth0();

  const handleClick = () => {
    onClick();
    clickRef.current.classList.toggle("closeSide");
    fillerRef.current.classList.toggle("closeFiller");
    gearRef.current.classList.toggle("closeGear");
    setClick(!click);
  };
  const handleLogout = async () => {
    if (isAuthenticated) {
      // user is logged in, log them out
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } else {
      // user is not loggedin, send to login
      await loginWithRedirect({
        appState: { returnTo: "/events" },
      });
    }
  };

  return (
    <>
      <div className="filler closeFiller" ref={fillerRef} />
      <img
        className="gear closeGear"
        onClick={handleClick}
        src={setting}
        ref={gearRef}
      />
      <div className="sideContainer closeSide" ref={clickRef}>
        <a className="sideItemWrapper" href="/">
          <h1 className="sideItem"> 🏠 HOME</h1>
        </a>
        <a className="sideItemWrapper">
          <h1 className="sideItem">🎉 EVENTS</h1>
        </a>
        <a className="sideItemWrapper">
          <h1 className="sideItem">⚙️ SETTINGS</h1>
        </a>
        <a className="sideLogWrapper">
          <h1 className="sideLog" onClick={handleLogout}>
            {isAuthenticated ? "🚪 LOGOUT" : "🔒 LOGIN"}
          </h1>
        </a>
      </div>
    </>
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SideBar;
