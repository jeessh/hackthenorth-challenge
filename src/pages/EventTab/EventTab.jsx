import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_EVENTS } from "../../GraphQL/queries";
import { useQuery } from "@apollo/client";

import SideBar from "../../components/SideBar/SideBar";
import EventCard from "../../components/EventCard/EventCard";
import EventExpanded from "../../components/EventExpanded/EventExpanded";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import { convertToTime, getDate } from "../../constants/constants";
import setting from "../../assets/setting.png";

import "./index.css";

const EventTab = () => {
  const { loading, data } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState([]);

  const [selectEvent, setSelectEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState(["tech_talk", "workshop", "activity"]);
  const [sort, setSort] = useState(sessionStorage.getItem("sort") === "true");

  const searchRef = useRef();
  const arrowRef = useRef();
  const { isAuthenticated } = useAuth0();

  const sortByDate = (a, b) => {
    return a.start_time - b.start_time;
  };
  const sortByType = (a, b) => {
    return a.event_type.localeCompare(b.event_type);
  };

  //After rendering, set filters/sort for data events
  useEffect(() => {
    if (data) {
      let output = [...data.sampleEvents];

      // Sorting by event type or date
      output = output.sort((a, b) =>
        sort ? sortByType(a, b) : sortByDate(a, b),
      );

      // Filtering based on user auth and event type filters
      output = output.filter((event) =>
        isAuthenticated
          ? filters.includes(event.event_type)
          : event.permission === "public" && filters.includes(event.event_type),
      );

      // Searching for events
      output = output.filter((event) => {
        let search = searchRef.current.children[0].value;
        return event.name.toLowerCase().includes(search.toLowerCase());
      });

      setEvents(output);
    }
    sessionStorage.setItem("sort", sort);
  }, [filters, sort, isAuthenticated, data]);

  const handleNewExpand = (id) => {
    let selectedEvent = data.sampleEvents.find((event) => event.id === id);
    setSelectEvent(selectedEvent);
  };

  const handleSearch = (event) => {
    let input = event.target.value;
    setSearch(input);
    let output = isAuthenticated
      ? data.sampleEvents.filter((event) =>
          event.name.toLowerCase().includes(search.toLowerCase()),
        )
      : data.sampleEvents.filter(
          (event) =>
            event.permission === "public" &&
            event.name.toLowerCase().includes(search.toLowerCase()),
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
    <main className="viewContainer">
      {/* Regular Search bar + Sidebar */}
      <SideBar onClick={() => setSidebarOpen(!sidebarOpen)} />
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
            <h2>Filters</h2>
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
                <fieldset className="advancedInlineWrapper">
                  <legend className="legend">Sort By</legend>
                  <button
                    className={sort ? "advancedButton" : "advancedButtonOn"}
                    onClick={() => setSort(!sort)}
                  >
                    Date
                  </button>
                  <button
                    className={!sort ? "advancedButton" : "advancedButtonOn"}
                    onClick={() => setSort(!sort)}
                  >
                    Event
                  </button>
                </fieldset>
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
                backgroundColor: "rgb(34, 32, 40)",
                boxShadow: "none",
                justifyContent: "center",
                transition: "0.15s ease-in",
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
              onClick={() => setSelectEvent(event)} // Modify this line
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
            onClick={() => setSelectEvent(null)}
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
