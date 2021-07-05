import express, { Application } from 'express';
import helmet from 'helmet';
import { DatabaseType, getDatabaseUsing } from './db';
import authMiddleware from './middleware/auth';
import { register } from './routes/register';
import { login } from './routes/login';

export function buildServer() {
  const app = express();

  app.set('database', getDatabaseUsing(process.env.db as DatabaseType));

  setMiddleware(app);
  buildRoutes(app);
  return app;
}

function setMiddleware(app: Application) {
  app.use(helmet());
  app.use(express.json());
  app.use(authMiddleware);
}

function buildRoutes(app: Application) {
  app.post('/register', register);
  app.post('/login', login);
}
