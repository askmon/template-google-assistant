import * as express from 'express';

import { config } from 'dotenv';

// loading '.env'
config();

const { PORT } = process.env;

const app = express();

app.get('/', (_req, res) => { res.send('Hello world'); });

app.listen(PORT, () => console.info(`Server listening on: ${PORT}`));
