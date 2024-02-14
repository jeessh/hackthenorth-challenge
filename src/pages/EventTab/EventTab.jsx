import React, { useEffect, useState, useRef } from "react";
import setting from "../../assets/setting.png";
import moment from "moment";
import SideBar from "../../components/SideBar/SideBar";
import EventCard from "../../components/EventCard/EventCard";
import EventExpanded from "../../components/EventExpanded/EventExpanded";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_EVENTS } from "../../GraphQL/queries";
import { useQuery } from "@apollo/client";
import "./index.css";

const EventTab = () => {
  const { data } = useQuery(GET_EVENTS);
  const [eventData, setEventData] = useState();
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState(["tech_talk", "workshop", "activity"]);
  const [sortDate, setSortDate] = useState(
    sessionStorage.getItem("sort") === "true",
  ); // if true, sort by date. else, sort by type

  const searchRef = useRef();
  const arrowRef = useRef();
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    fetch("https://api.hackthenorth.com/v3/events")
      .then((res) => res.json())
      .then((data) => {
        if (data !== eventData) {
          setEventData(data);
        }
      });
  }, []);

  //After rendering, set filteres for data events
  useEffect(() => {
    console.log(data.sampleEvents);
    if (eventData) {
      let output = [];
      output.push(...eventData);

      output = sortDate
        ? output.sort((eva, evb) =>
            eva.event_type.localeCompare(evb.event_type),
          )
        : output.sort((eva, evb) => eva.start_time - evb.start_time);

      // output.sort((eva, evb) => eva.start_time - evb.start_time);
      output = !isAuthenticated
        ? output.filter(
            (event) =>
              event.permission === "public" &&
              filters.includes(event.event_type),
          )
        : output.filter((event) => filters.includes(event.event_type));

      setEvents(output);
    }
    sessionStorage.setItem("sort", sortDate);
  }, [selectEvent, filters, sortDate, isAuthenticated, eventData]);

  const convertToTime = (unix) => {
    var t = new Date(unix);
    let converted = moment(t).format("h:mm a");
    return converted;
  };

  const getDate = (unix, format) => {
    // if format is true, return numerical date. otherwise, return string date
    var t = new Date(unix);
    let converted = format
      ? moment(t).format("MM/DD")
      : moment(t).format("MMMM Do, YYYY");
    return converted;
  };

  const handleExpand = (event) => {
    setSelectEvent(event);
  };

  const handleNewExpand = (id) => {
    let temp = eventData.filter((event) => event.id === id);
    setSelectEvent(temp[0]);
  };

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (event) => {
    let search = event.target.value;
    let output = isAuthenticated
      ? eventData.filter(
          (event) =>
            event.name.toLowerCase().includes(search.toLowerCase()) ||
            event.description.toLowerCase().includes(search.toLowerCase()),
        )
      : eventData.filter(
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
    let filter = [...filters];
    if (ev === "tech_talk") {
      filter[0] = filter[0] === "tech_talk" ? "" : "tech_talk";
    } else if (ev === "workshop") {
      filter[1] = filter[1] === "workshop" ? "" : "workshop";
    } else {
      filter[2] = filter[2] === "activity" ? "" : "activity";
    }
    setFilters(filter);
  };

  return (
    <section className="viewContainer">
      {/* Regular Search bar + Sidebar */}
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
        {/* Advanced Search Bar */}
        <div className="advancedSearchContainer">
          <div className="advancedSearchToggle" onClick={handleAdvanced}>
            <h2 onClick={handleAdvanced}>Advanced Search</h2>
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
              <div>
                <h3>Sort by:</h3>
                <button
                  className="sortButton"
                  onClick={() => setSortDate(!sortDate)}
                >
                  {sortDate ? "Event" : "Date"}
                </button>
                <h2></h2>
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
        {/* Parallax Images */}
        <ParallaxImage
          url={setting}
          offsetRate={0.02}
          top={10}
          rotate={0.08}
          className={"left"}
        />
        {/* Event Dashboard with all event cards */}
        <div className="eventContainer">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.name}
              date={getDate(event.start_time, true)}
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
            date={getDate(selectEvent.start_time, false)}
            start={convertToTime(selectEvent.start_time)}
            end={convertToTime(selectEvent.end_time)}
            description={selectEvent.description}
            speakers={selectEvent.speakers.map((speaker) => speaker.name)}
            url={
              isAuthenticated ? selectEvent.private_url : selectEvent.public_url
            }
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

export default EventTab;
