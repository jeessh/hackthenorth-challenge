import React, { useEffect, useState, useRef } from "react";
import setting from "../../assets/setting.png";
import SideBar from "../../components/SideBar/SideBar";
import EventCard from "../../components/EventCard/EventCard";
import EventExpanded from "../../components/EventExpanded/EventExpanded";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import { convertToTime, getDate } from "../../constants/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_EVENTS } from "../../GraphQL/queries";
import { useQuery } from "@apollo/client";
import "./index.css";

const EventTab = () => {
  const { loading, data } = useQuery(GET_EVENTS);
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

  //After rendering, set filteres for data events
  useEffect(() => {
    if (data) {
      let output = [];
      output.push(...data.sampleEvents);

      output = sortDate
        ? output.sort((eva, evb) =>
            eva.event_type.localeCompare(evb.event_type),
          )
        : output.sort((eva, evb) => eva.start_time - evb.start_time);

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
  }, [selectEvent, filters, sortDate, isAuthenticated, data]);

  const handleExpand = (event) => {
    setSelectEvent(event);
  };

  const handleNewExpand = (id) => {
    let temp = data.sampleEvents.filter((event) => event.id === id);
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

  const handleAccess = () => {
    let output = isAuthenticated;
    console.log(output);
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
    <main className="viewContainer">
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
        <section className="advancedSearchContainer">
          <div className="advancedSearchToggle" onClick={handleAdvanced}>
            <h2>Advanced Search</h2>
            <div className="arrowMove">
              <div className="arrow" ref={arrowRef} />
            </div>
          </div>
          {advancedSearch ? (
            <section className="advancedMenuContainer">
              <div className="filterWrapper">
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
              <div className="advancedInline">
                <div className="advancedInlineWrapper">
                  <button
                    className="advancedButton"
                    onClick={() => setSortDate(!sortDate)}
                  >
                    Date
                  </button>
                  <button
                    className="advancedButton"
                    onClick={() => setSortDate(!sortDate)}
                  >
                    Event
                  </button>
                </div>
                <div className="advancedInlineWrapper">
                  <button className="advancedButton" onClick={handleAccess}>
                    Public
                  </button>
                  <button className="advancedButton" onClick={handleAccess}>
                    Private
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <section
              className="advancedMenuContainer"
              style={{
                height: 0,
                width: "20%",
                border: 0,
                display: "flex",
                justifyContent: "center",
                transition: "0.2s ease-in",
              }}
            />
          )}
        </section>
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
        {events.length === 0 && !loading && (
          <div className="noEvents">
            <h1 className="noEventsText">No Events Found :{"("}</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default EventTab;
