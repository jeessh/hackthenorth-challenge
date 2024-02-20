import React from "react";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { Routes, Route, Navigate } from "react-router-dom";
import EventsDisplay from "./pages/EventsDisplay";
import Landing from "./pages/Landing";

import "./styles/globals.css";

const link = new HttpLink({
  uri: "https://corsproxy.io/?https://api.hackthenorth.com/v3/graphql"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<EventsDisplay />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ApolloProvider>
  );
};

export default App;
