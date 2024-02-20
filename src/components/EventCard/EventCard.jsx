import React from "react";
import PropTypes from "prop-types";
import { formatType, cardBorder, typeClass } from "../../utils/utils";
import "./EventCard.css";

const EventCard = ({ title, type, date, start, onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div
      className="cardWrapper"
      onClick={handleClick}
      style={{ border: `3.5px solid ${cardBorder(type)}`}}
    >
      <div className="cardTags">
        <h4 className={"eventType" + typeClass(type)}>{formatType(type)}</h4>
      </div>

      <div className="cardText">
        <h1>{title}</h1>
        <h2>
          {date} / {start}
        </h2>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
  start: PropTypes.string,
  onClick: PropTypes.func,
};

export default EventCard;
