const corsAnywhere = require('cors-anywhere');
const http = require('http');

const host = '0.0.0.0'; // Listen on all interfaces
const port = 8080;

const server = http.createServer((req, res) => {
  corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: ['origin', 'x-requested-with'], // Ensure these headers are included
  }).emit('request', req, res);
});

server.listen(port, host, () => {
  console.log(`CORS proxy server running on http://${host}:${port}`);
});