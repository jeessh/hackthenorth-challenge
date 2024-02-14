import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const EventCard = ({
  title,
  type,
  date,
  start,
  onClick,
  // end,
  // description,
  // speakers,
  // pub,
  // priv,
  // related,
  // permission
}) => {
  const formatType = (type) => {
    if (type === "tech_talk") {
      return "Tech Talk 🎙️";
    } else if (type === "workshop") {
      return "Workshop 🛠️";
    } else {
      return "Activity 🎉";
    }
  };

  const typeCol =
    type === "tech_talk" ? "Tech" : type === "workshop" ? "Work" : "Act";

  const cardBorder =
    type === "tech_talk"
      ? "rgba(137, 43, 115, 0.75)"
      : type === "workshop"
        ? "rgba(71, 123, 135, 0.75)"
        : "rgba(169, 98, 48, 0.75)";
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="cardWrapper"
      onClick={handleClick}
      style={{ border: `3px solid ${cardBorder}` }}
    >
      <div className="cardTags">
        <h3 className={"eventType" + typeCol}>{formatType(type)}</h3>
      </div>
      <div className="cardImage" />
      <div className="cardText">
        <h1>{title}</h1>
        <h2>
          {date} {start}
        </h2>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
  permission: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  description: PropTypes.string,
  speakers: PropTypes.array,
  pub: PropTypes.string,
  priv: PropTypes.string,
  related: PropTypes.array,
  onClick: PropTypes.func,
};

export default EventCard;
