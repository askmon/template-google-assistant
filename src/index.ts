import { json } from 'body-parser';
import { config } from 'dotenv';
import * as express from 'express';

import { app } from './app';

// loading '.env'
config();

const { PORT } = process.env;

const server = express();

server.use(json());

server.get('/', (_req, res) => res.send('Hello World!'));

server.post('/fulfillment', app());

server.listen(PORT, () => console.info(`Server listening on: ${PORT}`));
