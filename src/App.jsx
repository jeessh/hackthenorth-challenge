import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { Routes, Route, Navigate } from "react-router-dom";
import { CallbackPage } from "./pages/Auth0/callback";
import EventTab from "./pages/EventTab/EventTab";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";

import "./styles/globals.css";

const link = from([
  new HttpLink({ uri: "https://api.hackthenorth.com/v3/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App = () => {
  return (
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<EventTab />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
      </ApolloProvider>
  );
};

export default App;
