import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import EventTab from "./pages/EventTab/EventTab";
import Landing from "./pages/Landing/Landing";

import "./styles/globals.css";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<EventTab />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
};

export default App;
