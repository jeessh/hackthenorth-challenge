import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ParallaxImage.css";
import gear from "../../assets/GradientGear.png";
import triangle from "../../assets/Triangle.png";

const ParallaxImage = ({ image, offsetRate, top, rotate, className }) => {
  const [offset, setOffset] = useState(0);
  const handleScroll = () => {
    setOffset(window.scrollY);
  };
  const img = image === "gear" ? gear : triangle;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [offset]);

  return (
    // className: left / right
    // window.innerWidth >= 768 ? (
      <div className={className}>
        <img
          src={img}
          alt="parallax"
          className="parallax"
          style={{
            transform: `translateY(${offset * offsetRate}rem) rotateZ(${offset * rotate}deg)`,
            marginTop: `${top}em`,
          }}
        />
      </div>
    // ) : (
    //   <div></div>
    // )
  );
};

ParallaxImage.propTypes = {
  image: PropTypes.string.isRequired,
  offsetRate: PropTypes.number.isRequired,
  top: PropTypes.number,
  rotate: PropTypes.number,
  className: PropTypes.string,
};

export default ParallaxImage;
