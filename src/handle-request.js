const handleStatic = require("./handle-static");
const handleProxy = require("./handle-proxy");

function handler(config) {
  return async (request, response) => {
    try {
      for (const proxy of config.proxy) {
        if (request.url.startsWith(proxy.prefix)) {
          handleProxy(request, response, proxy);
          return;
        }
      }
      await handleStatic(request, response, config.publicPath);
    } catch (error) {
      console.error(error);
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify(error));
    }
  };
}
module.exports = handler;
