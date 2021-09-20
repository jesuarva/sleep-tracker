const path = require("path");
const express = require("express");
const helmet = require("helmet");
var cors = require("cors");

const sleepTrackerRouter = require("./sleepTracker.router");

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use("/", sleepTrackerRouter);

module.exports = {
  server,
};
