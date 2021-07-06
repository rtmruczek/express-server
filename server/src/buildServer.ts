require('dotenv').config();
import express, { Application } from 'express';
import helmet from 'helmet';
// import authMiddleware from './middleware/auth';
import { errorLoggerMiddleware, logger } from '@middleware/logger';
import { register } from '@routes/register';
import { login } from '@routes/login';

const authedRouter = express.Router();
const publicRouter = express.Router();

export function buildServer() {
  const app = express();
  setMiddleware(app);
  buildRoutes(app);
  return app;
}

function setMiddleware(app: Application) {
  app.use(helmet());
  app.use(express.json());
  app.use(errorLoggerMiddleware);

  // authedRouter.use(authMiddleware);

  app.use(express.static('public'));
  app.use('/', publicRouter);
}

function buildRoutes(app: Application) {
  publicRouter.post('/api/register', register);
  publicRouter.post('/api/login', login);
}
