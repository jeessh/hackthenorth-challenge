import React from "react";
import PropTypes from "prop-types";
import {
  convertToTime,
  getDate,
  formatEmoji,
  typeClass,
  cardBorder,
} from "../../constants/constants";
import "./EventRelatedCard.css";

const EventRelatedCard = ({ id, type, title, start, onClickRelated }) => {
  return (
    <div
      className="relatedContainer"
      style={{ border: `3.5px solid ${cardBorder(type)}` }}
      onClick={() => onClickRelated(id)}
    >
      <div>
        <h3 className={"relatedEmoji" + typeClass(type)}>
          {formatEmoji(type)}
        </h3>
        <h4 className={"relatedTag"}>
          {getDate(start, true)} {convertToTime(start)}
        </h4>
      </div>
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
  start: PropTypes.number,
  onClickRelated: PropTypes.func,
};

export default EventRelatedCard;
