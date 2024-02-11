import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const EventRelated = ({ id, title, onClickRelated }) => {
  return (
    <div className="relatedContainer" onClick={onClickRelated}>
      <h3>{id}</h3>
      <h3>{title}</h3>
    </div>
  );
};

EventRelated.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  onClickRelated: PropTypes.func,
};

export default EventRelated;
