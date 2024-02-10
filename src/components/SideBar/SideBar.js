import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const handleClick = () => {
    onClick();
    if (!click) {
      clickRef.current.classList.add("closeSide");
      fillerRef.current.classList.add("closeFiller");
      setClick(true);
    } else {
      clickRef.current.classList.remove("closeSide");
      fillerRef.current.classList.remove("closeFiller");
      setClick(false);
    }
  };
  const handleLogout = () => {
    localStorage.setItem("loggedIn", JSON.stringify(false));
    navigate("/");
  };

  return (
    <>
      <div className="gear" onClick={handleClick}>
        GEAR
      </div>
      <div className="filler closeFiller" ref={fillerRef} />
      <div className="sideContainer closeSide" ref={clickRef}>
        <div onClick={handleLogout}>LOGOUT</div>
      </div>
    </>
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SideBar;
