import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import setting from "../../assets/setting.png";
import PropTypes from "prop-types";
import "./index.css";

const SideBar = ({ onClick }) => {
  // 1. home button at top
  // search
  // filter options
  // colour switching
  //
  const navigate = useNavigate();
  const [click, setClick] = useState(true);
  const clickRef = useRef();
  const fillerRef = useRef();
  const gearRef = useRef();
  const handleClick = () => {
    onClick();
    clickRef.current.classList.toggle("closeSide");
    fillerRef.current.classList.toggle("closeFiller");
    gearRef.current.classList.toggle("closeGear");
    setClick(!click);
  };
  const handleLogout = () => {
    localStorage.setItem("loggedIn", JSON.stringify(false));
    navigate("/");
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
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </>
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SideBar;
