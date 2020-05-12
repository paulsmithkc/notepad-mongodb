const debug = require('debug')('app:server');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

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
