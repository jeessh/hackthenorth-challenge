import React from "react";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { Routes, Route, Navigate } from "react-router-dom";
import EventTab from "./pages/EventTab/EventTab";
import Landing from "./pages/Landing/Landing";

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
        <Route path="/events" element={<EventTab />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ApolloProvider>
  );
};

export default App;
