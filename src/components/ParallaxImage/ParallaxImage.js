import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.css";

const ParallaxImage = ({ url, offsetRate, top, rotate, side }) => {
  const [offset, setOffset] = useState(0);
  const handleScroll = () => {
    setOffset(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxContainer = side === "left" ? "parallaxContainerLeft" : "parallaxContainerRight";


  return (
    <div className={parallaxContainer}>
      <img
        src={url}
        alt="parallax"
        className="parallax"
        style={{
          transform: `translateY(${offset * offsetRate}rem) rotateZ(${offset * rotate}deg)`,
          marginTop: `${top}em`
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
  side: PropTypes.string
};

export default ParallaxImage;
