const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes and redirect them to index.html (for SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend is running on port ${port}`);
});
