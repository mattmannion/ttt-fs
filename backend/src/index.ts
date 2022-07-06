import 'reflect-metadata';
import 'module-alias/register';
require('dotenv').config();
import express, { json } from 'express';
import { path, port, prod } from 'src/env';
import cors from 'src/middleware/cors';
import session from 'src/middleware/redis-session';
import router from 'src/routes/router';
import TypeOrmInit from 'src/db/typeorm.db';

// this app will only be used for main server
// configuration, including initial middleware.
const app = express();

// if behind a proxy like nginx
app.set('trust proxy', prod);

// redis session
app.use(session);

// server config
app.disable('x-powered-by');
app.options('*', cors);
app.use(cors);

app.use(json());

// server router
app.use(...router);

(async function () {
  try {
    await TypeOrmInit();

    app.listen(port, () => console.log('live @ ' + path + port));
  } catch (error) {
    if (error instanceof Error) return console.log(error.message);
    return console.log('Unknown Error');
  }
})();
