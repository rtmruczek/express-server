import { RequestHandler } from 'express';
import { Database } from '../db';

interface RegisterRequestSignature {
  email: string;
  password: string;
}

export const register: RequestHandler<any, any, RegisterRequestSignature> = (
  req,
  res
) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.send(400);
  }

  const database: Database = req.app.get('database');

  database.getUniqueUserByEmail(req.body.email);

  res.set('Content-Type', 'application/json');
  return res.status(200).json({});
};
