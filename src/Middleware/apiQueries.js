/* eslint-disable no-undef */
import { gql } from "@apollo/client";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

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
