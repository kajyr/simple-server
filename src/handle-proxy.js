const http = require("http");
const https = require("https");

function handler(request, response, proxyConfig) {
  const options = {
    hostname: proxyConfig.hostname,
    path: request.url,
    method: request.method,
    headers: { ...request.headers, host: proxyConfig.hostname },
    rejectUnauthorized: false,
  };

  const h = proxyConfig.protocol === "https:" ? https : http;

  const proxy = h.request(options, function (res) {
    response.writeHead(res.statusCode, res.headers);
    res.pipe(response, {
      end: true,
    });
  });

  request.pipe(proxy, {
    end: true,
  });
}

module.exports = handler;
