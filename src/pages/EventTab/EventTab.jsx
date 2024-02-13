import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../GraphQL/apiQueries";
import setting from "../../assets/setting.png";
import moment from "moment";
import SideBar from "../../components/SideBar/SideBar";
import EventCard from "../../components/EventCard/EventCard";
import EventExpanded from "../../components/EventExpanded/EventExpanded";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";

const EventTab = () => {
  const { data } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState(["tech_talk", "workshop", "activity"]);
  const searchRef = useRef();
  const arrowRef = useRef();
  const { isAuthenticated } = useAuth0();

  //After rendering, set filteres for data events
  useEffect(() => {
    if (data) {
      let output = [];
      output.push(...data.sampleEvents);
      output.sort((eva, evb) => eva.start_time - evb.start_time);
      output = !isAuthenticated
        ? output.filter(
            (event) =>
              event.permission === "public" &&
              filters.includes(event.event_type),
          )
        : output.filter((event) => filters.includes(event.event_type));
      console.log(filters);
      console.log(output);

      setEvents(output);
    }
  }, [data, selectEvent, filters]);

  const convertToTime = (unix) => {
    var t = new Date(unix);
    let converted = moment(t).format("h:mm a");
    return converted;
  };

  const getNumDate = (unix) => {
    var t = new Date(unix);
    let converted = moment(t).format("MM/DD");
    return converted;
  };

  const getStrDate = (unix) => {
    var t = new Date(unix);
    let converted = moment(t).format("MMMM Do, YYYY");
    return converted;
  };

  const handleExpand = (event) => {
    setSelectEvent(event);
  };

  const handleNewExpand = (id) => {
    console.log(`ID: ${id}`);
    let temp = data.sampleEvents.filter((event) => event.id === id);
    console.log(temp);
    setSelectEvent(temp[0]);
  };

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (event) => {
    let search = event.target.value;
    let output = isAuthenticated
      ? data.sampleEvents.filter(
          (event) =>
            event.name.toLowerCase().includes(search.toLowerCase()) ||
            event.description.toLowerCase().includes(search.toLowerCase()),
        )
      : data.sampleEvents.filter(
          (event) =>
            event.permission === "public" &&
            (event.name.toLowerCase().includes(search.toLowerCase()) ||
              event.description.toLowerCase().includes(search.toLowerCase())),
        );
    setEvents(output);
  };

  const handleAdvanced = () => {
    setAdvancedSearch(!advancedSearch);
    arrowRef.current.style.transform = advancedSearch
      ? "rotateZ(0deg)"
      : "rotateZ(90deg)";
  };

  const advClick = (e, ev) => {
    e.stopPropagation();
    let temp = [...filters];
    if (ev === "tech_talk") {
      temp[0] = temp[0] === "tech_talk" ? "" : "tech_talk";
    } else if (ev === "workshop") {
      temp[1] = temp[1] === "workshop" ? "" : "workshop";
    } else {
      temp[2] = temp[2] === "activity" ? "" : "activity";
    }
    console.log(temp);
    setFilters(temp);
  };

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
          {advancedSearch ? (
            <div className="advancedMenuContainer">
              <div className="advFilter">
                <button
                  className={
                    "filter1" + (filters[0] === "tech_talk" ? " active" : "")
                  }
                  onClick={(e) => advClick(e, "tech_talk")}
                >
                  Tech Talk
                </button>
                <button
                  className={
                    "filter2 " + (filters[1] === "workshop" ? " active" : "")
                  }
                  onClick={(e) => advClick(e, "workshop")}
                >
                  Workshop
                </button>
                <button
                  className={
                    "filter3" + (filters[2] === "activity" ? " active" : "")
                  }
                  onClick={(e) => advClick(e, "activity")}
                >
                  Activity
                </button>
              </div>
            </div>
          ) : (
            <div
              className="advancedMenuContainer"
              style={{
                height: 0,
                width: "20%",
                border: 0,
                transition: "0.2s ease-in",
              }}
            />
          )}
        </div>
        <ParallaxImage
          url={setting}
          offsetRate={0.02}
          top={10}
          rotate={0.08}
          className={"left"}
        />

        <div className="eventContainer">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.name}
              date={getNumDate(event.start_time)}
              type={event.event_type}
              start={convertToTime(event.start_time)}
              onClick={() => handleExpand(event)} // Modify this line
            />
          ))}
        </div>
        {/* Toggled on when a card is clicked, showing expanded information */}
        {selectEvent && (
          <EventExpanded
            title={selectEvent.name}
            type={selectEvent.event_type}
            date={getStrDate(selectEvent.start_time)}
            start={convertToTime(selectEvent.start_time)}
            end={convertToTime(selectEvent.end_time)}
            description={selectEvent.description}
            speakers={selectEvent.speakers.map((speaker) => speaker.name)}
            url={isAuthenticated ? selectEvent.private_url : selectEvent.public_url}
            related={selectEvent.related_events}
            permission={selectEvent.permission}
            sidebarOpen={sidebarOpen}
            onClick={() => handleExpand()}
            onClickRelated={handleNewExpand}
          />
        )}
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
