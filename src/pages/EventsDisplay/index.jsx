import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_EVENTS } from "../../GraphQL/queries";
import { useQuery } from "@apollo/client";

import SideBar from "../../components/SideBar";
import EventCard from "../../components/EventCard";
import EventExpanded from "../../components/EventExpanded";
import ParallaxImage from "../../components/ParallaxImage";

import { convertToTime, getDate, sortByDate, sortByType } from "../../utils/utils";
import gear from "../../assets/GradientGear.webp";
import triangle from "../../assets/GradientTriangle.webp";
import "./EventsDisplay.css";

const EventsDisplay = () => {
  const { loading, data } = useQuery(GET_EVENTS);
  const { isAuthenticated } = useAuth0();
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState(false);
  const [sort, setSort] = useState(sessionStorage.getItem("sort") === "true");
  
  // Filters:
  //   - If filters were saved in the session storage, use those filters
  //   - Otherwise, default to all filters being true (typically new user)
  const [filters, setFilters] = useState(
    sessionStorage.getItem("filters")
      ? JSON.parse(sessionStorage.getItem("filters"))
      : { tech_talk: true, workshop: true, activity: true },
  );

  useEffect(() => {
    if (data) {
      let output = [...data.sampleEvents];

      // Filtering Events:
      output = output.filter((event) =>
        isAuthenticated
          ? filters[event.event_type]
          : event.permission === "public" && filters[event.event_type],
      );

      // Sorting Events:
      output = output.sort((a, b) => sort ? sortByType(a, b) : sortByDate(a, b));

      // Searching Events:
      output = output.filter((event) => {
        if (search === "") {
          return event;
        } else {
          return event.name.toLowerCase().includes(search.toLowerCase());
        }
      });

      setEvents(output);
    }

    // Save filtering and sorting options to session storage
    sessionStorage.setItem("filters", JSON.stringify(filters));
    sessionStorage.setItem("sort", sort);
  }, [filters, sort, search, isAuthenticated, data]);

  // Expanding related event information:
  //  - matches the new event to display
  const handleRelatedEvent = (id) => {
    let selectedEvent = data.sampleEvents.find((event) => event.id === id);
    setSelectEvent(selectedEvent);
  };

  const handleSearch = (event) => {
    let input = event.target.value;
    setSearch(input);
  };

  return (
    <main className="eventsDisplayContainer">
      {/* Regular Search Bar + Sidebar */}
      <SideBar onClick={() => setSidebarOpen(!sidebarOpen)} />
      <section className="eventsDisplay">
        <h1 className="dashboardTitle">Events Dashboard</h1>
        <div className="searchContainer">
          <input
            type="search"
            placeholder="Search Events"
            className="searchBar"
            onChange={handleSearch}
          />
        </div>
        {/* Advanced Search Bar (Filter + Sort) */}
        <section className="advancedSearchContainer">
          <div
            className="advancedSearchToggle"
            onClick={() => setAdvancedFilters(!advancedFilters)}
          >
            <h2>Filters</h2>
            <div className="arrowWrapper">
              <div
                className="arrow"
                style={{ transform: advancedFilters ? "rotateZ(90deg)" : "rotateZ(0deg)" }}
              />
            </div>
          </div>
          {/* Display filters if advancedSearchToggle is clicked */}
          {advancedFilters ? (
            <section className="advancedMenuContainer">
              <div className="filterWrapper">
                <button
                  className={ "filter1" + (filters["tech_talk"] ? " active" : "") }
                  onClick={() => setFilters({ ...filters, tech_talk: !filters["tech_talk"] })}
                >
                  Tech Talk
                </button>
                <button
                  className={ "filter2 " + (filters["workshop"] ? " active" : "") }
                  onClick={() => setFilters({ ...filters, workshop: !filters["workshop"] })}
                >
                  Workshop
                </button>
                <button
                  className={"filter3" + (filters["activity"] ? " active" : "")}
                  onClick={() => setFilters({ ...filters, activity: !filters["activity"] })}
                >
                  Activity
                </button>
              </div>
              <div className="sortContainer">
                <fieldset className="sortWrapper">
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
            <section className="closedAdvancedMenuContainer" />
          )}
        </section>
        {/* Parallax Images */}
        <ParallaxImage url={gear} offsetRate={0.02} top={10} rotate={0.08} className={"left"}/>
        <ParallaxImage url={triangle} offsetRate={0.015} top={80} rotate={0.065} className={"right"}/>
        {/* Event Cards */}
        <div className="eventContainer">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.name}
              date={getDate(event.start_time, true)}
              type={event.event_type}
              start={convertToTime(event.start_time)}
              onClick={() => setSelectEvent(event)}
            />
          ))}
        </div>
        {/* Expanded Event Tab */}
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
            onClickRelated={handleRelatedEvent}
          />
        )}
        {events.length === 0 && !loading && (
          <div className="noEvents">
            <h1 className="noEventsText">No Events Found :{"("}</h1>
          </div>
        )}
      </section>
    </main>
  );
};

export default EventsDisplay;
