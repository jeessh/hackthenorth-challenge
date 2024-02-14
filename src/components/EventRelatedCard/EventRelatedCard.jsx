import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const EventRelatedCard = ({ id, type, title, onClickRelated }) => {
  const cardBorder =
    type === "tech_talk"
      ? "rgba(137, 43, 115, 0.75)"
      : type === "workshop"
        ? "rgba(71, 123, 135, 0.75)"
        : "rgba(169, 98, 48, 0.75)";
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
    <div className="relatedContainer" style={{border: `2.5px solid ${cardBorder}`}} onClick={() => onClickRelated(id)}>
      <h3 className={"related" + typeCol}>{formatType(type)}</h3>
      <div className="relatedContent">
        <h2>{title}</h2>
      </div>
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
