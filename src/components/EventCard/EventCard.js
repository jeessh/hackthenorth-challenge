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
  //use openai to autogenerate an image
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

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="cardWrapper" onClick={handleClick}>
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
