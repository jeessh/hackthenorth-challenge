import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./EventExpanded.css";
import EventRelatedCard from "../EventRelatedCard/EventRelatedCard";
import { formatType, cardBorder, typeClass } from "../../constants/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../GraphQL/queries";

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
  onClickRelated,
}) => {

  const { isAuthenticated } = useAuth0();
  const { data } = useQuery(GET_EVENTS);

  let relatedEvents = data.sampleEvents.filter((event) => related.includes(event.id));
  relatedEvents = isAuthenticated ? relatedEvents : relatedEvents.filter((event) => event.permission === "public");

  useEffect(() => {
  }, [sidebarOpen]);

  const handleClose = () => {
    onClick();
  };
  const handleRelatedClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section className={"expandedBackground" + (sidebarOpen ? " backgroundWithSidebar" : "")} onClick={handleClose}>
      <div className="expandedContainer" onClick={handleRelatedClick} style={{ borderBottom: `8px solid ${cardBorder(type)}` }}>
        <h4 className={"expandedTag" + typeClass(type)}>{formatType(type)}</h4>
        <div className="closeX" onClick={handleClose}>X</div>
        <div className="expandedContent">
          <h1 className="expandedHeader">{title}</h1>
          <h3>🕒 {start} - {end} (UTC+0)</h3>
          <h3>📅 Date: {date}</h3>
          {speakers.map((speaker, index) => (
                <h3 key={index}>📣 Speakers: {speaker}</h3>
              ))}
          <p>{description}</p>
            <a className="externalLink" href={url} target="_blank" rel="noreferrer">
              Join the Event!
            </a>
          { // Display related events if there are any
          relatedEvents.length > 0 && (
            <>
              <h2 className="relatedEventsHeader">🔗 Related Events:</h2>
              <div className={"relatedEventsContainer" }>
                {relatedEvents.map((event) => (
                  <EventRelatedCard
                    key={event.id}
                    id={event.id}
                    start={event.start_time}
                    date={event.date}
                    title={event.name}
                    type={event.event_type}
                    onClickRelated={onClickRelated}
                  />
                ))}
              </div>
            </>
          )}
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
