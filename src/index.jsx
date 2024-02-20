import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SpeedInsights />
    <Router>
      <Auth0Provider
        domain="dev-ruci46tz0uzhgmcu.us.auth0.com"
        clientId="NHNQiidPNL86VCJaVp9I5TEhJQjxFFbO"
        authorizationParams={{
          redirect_uri: window.location.origin + "/events",
        }}
      >
        <App />
      </Auth0Provider>
    </Router>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
