require('dotenv').config();
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authMiddleware from '@middleware/auth';
import {
  infoLoggerMiddleware,
  logger,
} from '@middleware/logger';
import { token } from '@routes/auth';
import me from '@routes/me';
import cookieParser from 'cookie-parser';
import Context from '@middleware/context';

const authedRouter = express.Router();
const publicRouter = express.Router();

export function buildServer() {
  const app = express();
  setMiddleware(app);
  buildRoutes(app);
  return app;
}

type asyncRequestHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise<any>;

const asyncWrapper = (cb: asyncRequestHandler) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => cb(req, res, next).catch(next);
};

function setMiddleware(app: Application) {
  app.use(express.json());
  app.use(
    cors({
      origin: 'http://app.dev.local:3000',
      credentials: true,
    })
  );
  app.use((req, res, next) => {
    Context.bind(req);
    next();
  });
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(infoLoggerMiddleware);

  authedRouter.use(authMiddleware);

  app.use('/', publicRouter);
  app.use('/', authedRouter);

  app.use(function (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (err) {
      logger.error(err.stack);
      return res.sendStatus(500);
    }
  });
}

function buildRoutes(app: Application) {
  publicRouter.post('/api/discord-auth', asyncWrapper(token));

  authedRouter.get('/api/me', me);
}
