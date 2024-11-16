import corsAnywhere from 'cors-anywhere';
import http from 'http';

const host = '0.0.0.0'; // Listen on all interfaces
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
