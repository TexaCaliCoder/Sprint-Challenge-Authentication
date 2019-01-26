const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(
  helmet(),
  cors(),
  express.json(),
  logger('dev'),
);


configureRoutes(server);

module.exports = {
  server,
};
