import cors from "cors";
import express from "express";

const app = express();

const options = [
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
];

app.use(options);
