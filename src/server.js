const createKeys = require("./create-keys");
const handleRequest = require("./handle-request");
const http = require("http");
const https = require("https");

const init = function (config) {
  function log(...args) {
    if (config.verbose) {
      console.log(...args);
    }
  }

  let server;

  if (config.ssl) {
    server = https
      .createServer(createKeys(), handleRequest(config))
      .listen(Number(config.port));
  } else {
    server = http
      .createServer(handleRequest(config))
      .listen(Number(config.port));
  }

  server.on("listening", function () {
    log("----");
    log(config.name, config.version);
    log("Serving", config.publicPath);
    log(`on ${config.ssl ? "https" : "http"}://localhost:${config.port}`);
    log();
  });

  server.on("error", (e) => {
    server.close();
    throw e;
  });

  return server;
};

module.exports = init;
