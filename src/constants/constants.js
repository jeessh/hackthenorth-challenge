import moment from "moment";
// format type, border colours, anything else that is const
export const convertToTime = (unix) => {
  var t = new Date(unix);
  let converted = moment(t).format("h:mm a");
  return converted;
};

export const getDate = (unix, format) => {
  // if format is true, return numerical date. otherwise, return string date
  var t = new Date(unix);
  let converted = format
    ? moment(t).format("MM/DD")
    : moment(t).format("MMMM Do, YYYY");
  return converted;
};

export const formatType = (type) => {
  if (type === "tech_talk") {
    return "Tech Talk 🎙️";
  } else if (type === "workshop") {
    return "Workshop 🛠️";
  } else {
    return "Activity 🎉";
  }
};

export const formatEmoji = (type) => {
  if (type === "tech_talk") {
    return "🎙️";
  } else if (type === "workshop") {
    return "🛠️";
  } else {
    return "🎉";
  }
};

export const typeClass = (type) => {
  if (type === "tech_talk") {
    return "Tech";
  } else if (type === "workshop") {
    return "Work";
  } else {
    return "Act";
  }
};

export const cardBorder = (type) => {
  if (type === "tech_talk") {
    return "rgba(137, 43, 115, 0.75)";
  } else if (type === "workshop") {
    return "rgba(71, 123, 135, 0.75)";
  } else {
    return "rgba(169, 98, 48, 0.75)";
  }
};
