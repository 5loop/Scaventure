import express from 'express';
import http from 'http';

// API routes import
import { AuthRoutes, QuestRoutes, ProgressRoutes } from './modules';

import middlewareConfig from './config/middleware';
import dbConfig from './config/db';
require('dotenv').config();

const passportService = require('./config/passport');
const app = express();
let server = http.createServer(app);

dbConfig();
middlewareConfig(app);

app.use('/api', [ AuthRoutes, QuestRoutes, ProgressRoutes ]);

const PORT = process.env.PORT || 4100;

server.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen to port: ${PORT}`);
  }
});
