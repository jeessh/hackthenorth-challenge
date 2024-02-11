import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./index.css";
import EventRelated from "../EventRelated/EventRelated";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../GraphQL/apiQueries";

const EventExpanded = ({
  title,
  type,
  date,
  description,
  start,
  end,
  speakers,
  url,
  related,
  sidebarOpen,
  onClick,
  onClickRelated
}) => {
  const expandedRef = useRef();
  const { data } = useQuery(GET_EVENTS);
  const relatedEvents = data.sampleEvents.filter((event) =>
    related.includes(event.id),
  );

  useEffect(() => {
    if (sidebarOpen) {
      expandedRef.current.style.width = "70vw";
    } else {
      expandedRef.current.style.width = "100vw";
    }
    console.log(relatedEvents);
  }, [sidebarOpen]);

  const handleClick = (e) => {
    onClick();
    e.stopPropagation();
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

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

  return (
    <section
      className="expandedBackground"
      ref={expandedRef}
      onClick={handleClick}
    >
      <div className="expandedContainer" onClick={handleChildClick}>
        <h3 className={"expandedEv" + typeCol}>{formatType(type)}</h3>

        <div className="expandedContent">
          <h1>{title}</h1>
          <h3>
            🕒 {start} - {end} (UTC+0)
          </h3>
          <h3>📅 Date: {date}</h3>
          {speakers.map((speaker, index) => (
            <h3 key={index}>📣 Speakers: {speaker}</h3>
          ))}
          <p>{description}</p>
          <a
            className="externalLink"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Join the Event!
          </a>
          <h2>🔗 Related Events:</h2>
          <div className="relatedEventsContainer">
            {relatedEvents.map((event) => (
              <EventRelated
                key={event.id}
                id={event.id}
                title={event.name}
                onClickRelated={onClickRelated}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

EventExpanded.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  description: PropTypes.string,
  speakers: PropTypes.array,
  url: PropTypes.string,
  related: PropTypes.array,
  sidebarOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onClickRelated: PropTypes.func,
};

export default EventExpanded;
