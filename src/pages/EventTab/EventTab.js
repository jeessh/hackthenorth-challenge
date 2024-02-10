import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../GraphQL/apiQueries";
import moment from "moment";
import SideBar from "../../components/SideBar/SideBar";
import EventCard from "../../components/EventCard/EventCard";
import EventExpanded from "../../components/EventExpanded/EventExpanded";
import "./index.css";

const EventTab = () => {
  const { data } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //After rendering, set filteres for data events
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedIn"));
    console.log("Logged in: " + logged);
    if (logged) {
      setLoggedIn(true);
    }
    if (data) {
      let output = [];
      output.push(...data.sampleEvents);
      output.sort((eva, evb) => eva.start_time - evb.start_time);
      output = !loggedIn
        ? output.filter((event) => event.permission === "public")
        : output;
      setEvents(output);
    }
  }, [data, loggedIn, selectEvent]);

  const convertToTime = (unix) => {
    var t = new Date(unix);
    let converted = moment(t).format("h:mm a");
    return converted;
  };

  const getDate = (unix) => {
    var t = new Date(unix);
    let converted = moment(t).format("MM/DD");
    return converted;
  };

  const handleExpand = (event) => {
    setSelectEvent(event);
    console.log(event);
  };

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseExpand = () => {
    console.log(selectEvent);
    setSelectEvent(null);
  };

  const handleSearch = (event) => {
    let search = event.target.value;
    let output = data.sampleEvents.filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase()),
    );
    setEvents(output);
  };

  return (
    <div className="viewContainer">
      <SideBar onClick={() => handleSideBar()} />
      <div>
        <div className="searchContainer">
          <input
            type="search"
            placeholder="Search Events"
            className="searchBar"
            onChange={handleSearch}
          />
        </div>
        <div className="eventContainer">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.name}
              date={getDate(event.start_time)}
              type={event.event_type}
              permission={event.permission}
              start={convertToTime(event.start_time)}
              end={convertToTime(event.end_time)}
              speakers={event.speakers.map((speaker) => speaker.name)}
              related={event.related_events}
              pub={event.public_url}
              priv={event.private_url}
              description={event.description}
              onClick={() => handleExpand(event)} // Modify this line
            />
          ))}
        </div>
        {selectEvent !== null ? (
          <EventExpanded
            title={selectEvent.name}
            type={selectEvent.event_type}
            date={getDate(selectEvent.start_time)}
            start={convertToTime(selectEvent.start_time)}
            end={convertToTime(selectEvent.end_time)}
            description={selectEvent.description}
            speakers={selectEvent.speakers.map((speaker) => speaker.name)}
            pub={selectEvent.public_url}
            priv={selectEvent.private_url}
            related={selectEvent.related_events}
            permission={selectEvent.permission}
            sidebarOpen={sidebarOpen}
            onClick={handleCloseExpand}
          />
        ) : null}
      </div>
    </div>
  );
};
// query {
//   sampleEvents {
//     id
//     name
//     event_type
//     permission
//     start_time
//     end_time
//     description
//     speakers {
//       name
//     }
//     public_url
//     private_url
//     related_events
//   }
// }

export default EventTab;
