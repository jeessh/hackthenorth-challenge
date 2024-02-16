import React, { useEffect, useState } from "react";
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
  const { isAuthenticated } = useAuth0();

  const [selectEvent, setSelectEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    tech_talk: true,
    workshop: true,
    activity: true,
  });
  const [sort, setSort] = useState(sessionStorage.getItem("sort") === "true");

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
      let filterList = [];
      for (const key in filters) {
        if (filters[key]) {
          filterList.push(key);
        }
      }

      output = output.filter((event) => isAuthenticated
        ? filters[event.event_type] : event.permission === "public" && filters[event.event_type],
      );

      // Searching for events
      output = output.filter((event) => {
        if (search === "") {
          return event;
        } else {
          return event.name.toLowerCase().includes(search.toLowerCase());
        }
      });

      setEvents(output);
    }
    sessionStorage.setItem("sort", sort);
  }, [filters, sort, search, isAuthenticated, data]);

  const handleNewExpand = (id) => {
    let selectedEvent = data.sampleEvents.find((event) => event.id === id);
    setSelectEvent(selectedEvent);
  };

  const handleSearch = (event) => {
    let input = event.target.value;
    setSearch(input);
  };

  const handleAdvancedFilters = () => {
    setAdvancedFilters(!advancedFilters);
  };

  return (
    <main className="viewContainer">
      {/* Regular Search bar + Sidebar */}
      <SideBar onClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="align">
        <h1 className="eventTabHeader">Event Dashboard</h1>
        <div className="searchContainer">
          <input
            type="search"
            placeholder="Search Events"
            className="searchBar"
            onChange={handleSearch}
          />
        </div>
        {/* Advanced Search Bar */}
        <section className="advancedSearchContainer">
          <div className="advancedSearchToggle" onClick={handleAdvancedFilters}>
            <h2>Filters</h2>
            <div className="arrowMove">
              <div className="arrow" style={{transform: advancedFilters ? "rotateZ(90deg)" : "rotateZ(0deg)"}}/>
            </div>
          </div>
          {advancedFilters ? (
            <section className="advancedMenuContainer">
              <div className="filterWrapper">
                <button className={"filter1" + (filters["tech_talk"] ? " active" : "")}
                  onClick={() => setFilters({ ...filters, tech_talk: !filters["tech_talk"] })}>
                  Tech Talk
                </button>
                <button className={"filter2 " + (filters["workshop"] ? " active" : "")}
                  onClick={() => setFilters({ ...filters, workshop: !filters["workshop"] })}>
                  Workshop
                </button>
                <button className={"filter3" + (filters["activity"] ? " active" : "")}
                  onClick={() => setFilters({ ...filters, activity: !filters["activity"] })}>
                  Activity
                </button>
              </div>
              <div className="advancedInline">
                <fieldset className="advancedInlineWrapper">
                  <legend className="legend">Sort By</legend>
                  <button className={sort ? "advancedButton" : "advancedButtonOn"} onClick={() => setSort(!sort)}>
                    Date
                  </button>
                  <button className={!sort ? "advancedButton" : "advancedButtonOn"} onClick={() => setSort(!sort)}>
                    Event
                  </button>
                </fieldset>
              </div>
            </section>
          ) : (
            <section className="closedAdvancedMenuContainer"/>
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
        {/* Expanded Event Information:
              - Toggled on when an event card is clicked
        */}
        {selectEvent && (
          <EventExpanded
            title={selectEvent.name}
            type={selectEvent.event_type}
            date={getDate(selectEvent.start_time, false)}
            start={convertToTime(selectEvent.start_time)}
            end={convertToTime(selectEvent.end_time)}
            description={selectEvent.description}
            speakers={selectEvent.speakers.map((speaker) => speaker.name)}
            url={isAuthenticated ? selectEvent.private_url : selectEvent.public_url}
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
