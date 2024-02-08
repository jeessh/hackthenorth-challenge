import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../GraphQL/apiQueries";
import moment from "moment";
import SideBar from "../../components/SideBar/SideBar";
import EventCard from "../../components/EventCard/EventCard";
import "./index.css";
const EventTab = () => {
  const { data } = useQuery(GET_EVENTS);
  const [events, setEvents] = useState([]);

  //After rendering, set filteres for data events
  useEffect(() => {
    //.filter((event) => event.permission === 'public')
    if (data) {
      let output = [];
      output.push(...data.sampleEvents);
      console.log(output);
      output.sort((eva, evb) => eva.start_time - evb.start_time);
      console.log(output);
      setEvents(output);
    }
  }, [data]);

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

  return (
    <div className="viewContainer">
      <SideBar />
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
          />
        ))}
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
