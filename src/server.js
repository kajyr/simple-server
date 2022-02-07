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
  try {
    if (config.ssl) {
      https
        .createServer(createKeys(), handleRequest(config))
        .listen(Number(config.port));
    } else {
      http.createServer(handleRequest(config)).listen(Number(config.port));
    }

    log("----");
    log(config.name, config.version);
    log("Serving", config.publicPath);
    log(`on ${config.ssl ? "https" : "http"}://localhost:${config.port}`);
    log();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = init;
