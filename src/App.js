import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import EventTab from "./pages/EventTab/EventTab";

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
      <EventTab />
    </ApolloProvider>
  );
};

export default App;
