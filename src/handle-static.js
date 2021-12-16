const { statSync, createReadStream, existsSync } = require("fs");
const path = require("path");

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".jpeg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};

async function handler(request, response, config) {
  let filePath = `${config.publicPath}${request.url}`;
  if (filePath.endsWith("/")) {
    filePath += "index.html";
  }

  if (!existsSync(filePath) && config.frontendRouting) {
    filePath = `${config.publicPath}/index.html`;
  }

  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || "application/octet-stream";

  try {
    const stat = statSync(filePath);

    response.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stat.size,
    });
    createReadStream(filePath).pipe(response, { end: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      response.writeHead(404);
      response.end("404 Not Found");
      return;
    }
    throw error;
  }
}

module.exports = handler;
