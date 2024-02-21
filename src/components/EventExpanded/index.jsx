import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./EventExpanded.css";
import EventRelatedCard from "../EventRelatedCard";
import { formatType, cardBorder, typeClass } from "../../utils/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../GraphQL/queries";

const EventExpanded = (props) => {

  const { isAuthenticated } = useAuth0();
  const { data } = useQuery(GET_EVENTS);

  // Retrieving related events to the current expanded event
  let relatedEvents = data.sampleEvents.filter((event) => props.related.includes(event.id));
  relatedEvents = isAuthenticated ? relatedEvents : relatedEvents.filter((event) => event.permission === "public");

  const handleClose = () => {
    props.onClick();
  };
  
  const handleRelatedClick = (e) => {
    e.stopPropagation();
  };

  return (
    <section className={"expandedBackground" + (props.sidebarOpen ? " backgroundWithSidebar" : "")} onClick={handleClose}>
      <div className="expandedContainer" onClick={handleRelatedClick} style={{ borderBottom: `8px solid ${cardBorder(props.type)}` }}>
        <h4 className={"expandedTag" + typeClass(props.type)}>{formatType(props.type)}</h4>
        <div className="closeX" onClick={handleClose}>X</div>
        <div className="expandedContent">
          <h1 className="expandedHeader">{props.title}</h1>
          <h3>🕒 | {props.start} - {props.end} (UTC+0)</h3>
          <h3>📅 | {props.date}</h3>
          {props.speakers.map((speaker, index) => (
                <h3 key={index}>📣 | {speaker}</h3>
              ))}
          <p>{props.description}</p>
            <a className="externalLink" href={props.url} target="_blank" rel="noreferrer">
              Join the Event!
            </a>
          { // Display related events if they exist
          relatedEvents.length > 0 && (
            <>
              <h2 className="relatedEventsHeader">🔗 Related Events:</h2>
              <div className={"relatedEventsContainer" }>
                {relatedEvents.map((event) => (
                  <EventRelatedCard
                    key={event.id}
                    id={event.id}
                    start={event.start_time}
                    title={event.name}
                    type={event.event_type}
                    onClickRelated={props.onClickRelated}
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
