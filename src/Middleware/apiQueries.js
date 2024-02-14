/* eslint-disable no-undef */
import { gql } from "@apollo/client";
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://hackthenorth-jesse.vercel.app",
    credentials: true, // Enable credentials if you're sending cookies or other sensitive information
  }),
);

export const GET_EVENTS = gql`
  query {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
      }
      public_url
      private_url
      related_events
    }
  }
`;
