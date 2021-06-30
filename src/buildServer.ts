import express, { Application } from 'express';
import { register } from './routes/register';
// import { login } from './routes/login';

export function buildServer() {
  const app = express();
  buildRoutes(app);
  return app;
}

function buildRoutes(app: Application) {
  app.post('/register', register);
}
