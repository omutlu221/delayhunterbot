const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type":"text/plain"});
  res.end("DelayHunterBot Online");
}).listen(PORT, () => {
  console.log("Running on port " + PORT);
});
