const http = require("http");

const handleRequest = require("./handle-request");

const pkg = require("../package.json");

const init = function (config) {
  function log(...args) {
    if (config.verbose) {
      console.log(...args);
    }
  }
  try {
    http.createServer(handleRequest(config)).listen(Number(config.port));

    log("----");
    log(pkg.name, pkg.version);
    log("Serving", config.publicPath);
    log(`on http://localhost:${config.port}`);
    log();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = init;
