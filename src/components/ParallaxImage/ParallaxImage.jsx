import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.css";

const ParallaxImage = ({ url, offsetRate, top, rotate, className }) => {
  const [offset, setOffset] = useState(0);
  const handleScroll = () => {
    setOffset(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    // Remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [offset]);

  return (
    <div className={className}>
      <img
        src={url}
        alt="parallax"
        className="parallax"
        style={{
          transform: `translateY(${offset * offsetRate}rem) rotateZ(${offset * rotate}deg)`,
          marginTop: `${top}em`,
        }}
      />
    </div>
  );
};

ParallaxImage.propTypes = {
  url: PropTypes.string.isRequired,
  offsetRate: PropTypes.number.isRequired,
  top: PropTypes.number,
  rotate: PropTypes.number,
  className: PropTypes.string,
};

export default ParallaxImage;