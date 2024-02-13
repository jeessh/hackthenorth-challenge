import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const EventRelatedCard = ({ id, type, title, onClickRelated }) => {
  const typeCol =
    type === "tech_talk" ? "Tech" : type === "workshop" ? "Work" : "Act";
  const formatType = (type) => {
    if (type === "tech_talk") {
      return "🎙️";
    } else if (type === "workshop") {
      return "🛠️";
    } else {
      return "🎉";
    }
  };
  return (
    <div className="relatedContainer" onClick={() => onClickRelated(id)}>
      <h3 className={"related" + typeCol}>{formatType(type)}</h3>
      <h2>{title}</h2>
    </div>
  );
};

EventRelatedCard.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  title: PropTypes.string,
  onClickRelated: PropTypes.func,
};

export default EventRelatedCard;
