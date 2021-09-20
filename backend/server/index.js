const path = require("path");
const express = require("express");
const helmet = require("helmet");
const sleepTrackerRouter = require("./sleepTracker.router");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/", sleepTrackerRouter);

module.exports = {
  server,
};
