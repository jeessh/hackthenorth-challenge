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
    if (!click) {
      clickRef.current.classList.add("closeSide");
      fillerRef.current.classList.add("closeFiller");
      gearRef.current.classList.add("closeGear");

      setClick(true);
    } else {
      clickRef.current.classList.remove("closeSide");
      fillerRef.current.classList.remove("closeFiller");
      gearRef.current.classList.remove("closeGear");
      setClick(false);
    }
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
        <div onClick={handleLogout}>LOGOUT</div>
      </div>
    </>
  );
};

SideBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SideBar;
