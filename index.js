// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import itemRouter from './src/routes/item-router.mjs';
import userRouter from './src/routes/user-router.mjs';
import entryRouter from './src/routes/entry-router.mjs';
import cors from 'cors';
import logger from './src/middlewares/logger.mjs';
import authRouter from './src/routes/auth-router.mjs';
import {errorHandler, notFoundHandler} from './src/middlewares/error-handler.mjs';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// middleware, joka lisää CORS-otsakkeen jokaiseen lähtevään vastaukseen.
app.use(cors());

// logger middleware
app.use(logger);

// middleware, joka parsii pyynnössä olevan JSON-datan
// ja lisää sen request-objektiin (req.body)
app.use(express.json());

// Staattinen sivusto palvelimen juureen 
app.use(express.static('public'));

// Tarjoiltava kansio määritellään relatiivisella polulla
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/docs', express.static(path.join(__dirname, '../docs')));

app.use('/items', itemRouter);

app.use('/api/entries', entryRouter);

app.use('/api/users', userRouter);

app.use('/api/auth', authRouter);

// Default 404 not found
app.use(notFoundHandler);
// Error handler for sending response all error cases
app.use(errorHandler);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});