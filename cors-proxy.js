const corsAnywhere = require('cors-anywhere');
const http = require('http');

const host = '0.0.0.0'; 
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  corsAnywhere.createServer({
    originWhitelist: [], 
    requireHeaders: ['origin', 'x-requested-with'], 
  }).emit('request', req, res);
});

server.listen(port, host, () => {
  console.log(`CORS proxy server running on http://${host}:${port}`);
});