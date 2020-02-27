let path = '.env';
if(process.env.DOT_ENV_PATH)
  path = process.env.DOT_ENV_PATH;

require('dotenv').config({path: path});

const config = require("config");

const server = require("./express");
process.on('uncaughtException', function(ex) {
  console.log(ex)
});

server.start(config.port);