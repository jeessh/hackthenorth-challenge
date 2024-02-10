import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../GraphQL/apiQueries";
import setting from "../../assets/setting.png";
import moment from "moment";
import SideBar from "../../components/SideBar/SideBar";
import EventCard from "../../components/EventCard/EventCard";
import EventExpanded from "../../components/EventExpanded/EventExpanded";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import "./index.css";

const EventTab = () => {
  const { data } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const searchRef = useRef();
  const arrowRef = useRef();

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
    window.addEventListener("load", setLoading(false));
    return () => {
      window.removeEventListener("load", setLoading(false));
    };
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
    setSelectEvent(null);
  };

  const handleSearch = (event) => {
    let search = event.target.value;
    let output = data.sampleEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()),
    );
    if (output.length <= 2) {
      console.log("2")
    }
    setEvents(output);
  };

  const handleAdvanced = () => {
    setAdvancedSearch(!advancedSearch);
    arrowRef.current.style.transform = advancedSearch
      ? "rotateZ(0deg)"
      : "rotateZ(90deg)";
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <section className="viewContainer">
      <SideBar onClick={() => handleSideBar()} />
      <div className="align">
        <h1 className="eventTabHeader">Event Dashboard</h1>
        <div className="searchContainer" ref={searchRef}>
          <input
            type="search"
            placeholder="Search Events"
            className="searchBar"
            onChange={handleSearch}
          />
        </div>
        <div className="advancedSearchContainer">
          <div className="advancedSearchToggle" onClick={handleAdvanced}>
            <h1 onClick={handleAdvanced}>Advanced Search</h1>
            <div className="arrowMove">
              <div className="arrow" ref={arrowRef} />
            </div>
          </div>
        </div>
        <ParallaxImage url={setting} offsetRate={0.02} top={10} rotate={0.08} className={"left"} />

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
        {events.length === 0 && (
          <div className="noEvents">
            <h1 className="noEventsText">No Events Found :{"("}</h1>
          </div>
        )}
      </div>
    </section>
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
