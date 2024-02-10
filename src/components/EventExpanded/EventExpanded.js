import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./index.css";

const EventExpanded = ({ title, permission, sidebarOpen, onClick }) => {
  const expandedRef = useRef();

  useEffect(() => {
    if (sidebarOpen) {
      expandedRef.current.style.width = "70vw";
    } else {
      expandedRef.current.style.width = "100vw";
    }
  }, [sidebarOpen]);

  const handleClick = (e) => {
    console.log("clicked parent");
    onClick();
    e.stopPropagation();
  };

  const handleChildClick = (e) => {
    console.log(permission);
    e.stopPropagation();
    console.log("clicked child");
  };

  return (
    <section
      className="expandedBackground"
      ref={expandedRef}
      onClick={handleClick}
    >
      <div className="expandedContainer" onClick={handleChildClick}>
        <h1>{title}</h1>
        <h2>{permission}</h2>
        {/* <h2>{type}</h2>
            <h2>{speakers}</h2>
            <h2>{date}</h2>
            <h2>{start}</h2>
            <h2>{end}</h2>
            <p>{description}</p>
            <h2>{pub}</h2>
            <h2>{priv}</h2>
            <h2>{related}</h2> */}
      </div>
    </section>
  );
};

EventExpanded.propTypes = {
  title: PropTypes.string,
  permission: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  description: PropTypes.string,
  speakers: PropTypes.array,
  pub: PropTypes.string,
  priv: PropTypes.string,
  related: PropTypes.array,
  sidebarOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

// title: PropTypes.string,
// type: PropTypes.string,
// date: PropTypes.string,
// permission: PropTypes.string,
// start: PropTypes.string,
// end: PropTypes.string,
// description: PropTypes.string,
// speakers: PropTypes.array,
// pub: PropTypes.string,
// priv: PropTypes.string,
// related: PropTypes.array,

export default EventExpanded;
