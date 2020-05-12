const debug = require('debug')('app:server');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

const hostname = config.get('http.hostname');
const port = config.get('http.port');

const app = express();

// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use(express.static('public'));
app.use((request, response) => {
  response.status(404).type('text/plain').send('Page Not Found');
});

// Bind the server to an http port
app.listen(port, hostname, () => {
  debug(`Server running at http://${hostname}:${port}/`);
});
