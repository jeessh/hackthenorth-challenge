import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { Routes, Route, Navigate } from "react-router-dom";
import EventTab from "./pages/EventTab/EventTab";
import Landing from "./pages/Landing/Landing";

import "./styles/globals.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.hackthenorth.com/v3/graphql",
    fetchOptions: {
      mode: "cors", // no-cors, *cors, same-origin
    },
  }),
  uri: "https://api.hackthenorth.com/v3/graphql",
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
