import React, { useState } from "react";
import gear from "../../assets/GreyGear.webp";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import "./SideBar.css";

const SideBar = ({ onClick }) => {
  const [sidebar, setSidebar] = useState(true);
  const { isAuthenticated } = useAuth0();
  const { logout, loginWithRedirect } = useAuth0();

  const handleOpen = () => {
    setSidebar(!sidebar);
    onClick();
  };
  const handleLogout = async () => {
    // User is currently logged in: log them out
    if (isAuthenticated) {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
      // User is not logged in: send to login
    } else {
      await loginWithRedirect({
        appState: { returnTo: "/events" },
      });
    }
  };

  return (
    <>
      <div className={"sideContainer" + (sidebar ? " closeSide" : "")}>
        <a className="sideItemWrapper" href="/">
          <h1 className="sideItem"> 🏠 HOME</h1>
        </a>
        <a className="sideItemWrapper">
          <h1 className="sideItem">🎉 EVENTS</h1>
        </a>
        <a className="sideLogWrapper">
          <h1 className="sideLog" onClick={handleLogout}>
            {isAuthenticated ? "🚪 LOGOUT" : "🔒 LOGIN"}
          </h1>
        </a>
      </div>
      <div className={"filler" + (sidebar ? " closeFiller" : "")} />
      <img
        className={"gear" + (sidebar ? " closeGear" : "")}
        onClick={handleOpen}
        src={gear}
      />
    </>
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SideBar;
