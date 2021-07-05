import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import path from 'path';

import { Database } from '../db';

const jwtSecret = readFileSync(path.join('.keys', 'jwtprivate.pem')).toString();

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const db = req.app.get('database') as Database;
  const user = await db.getUniqueUserByEmail(email);

  if (!user || user.password !== password) {
    return res.sendStatus(401);
  }

  const jwtString = jwt.sign({ email }, jwtSecret);
  res.set('_jwt', jwtString);
  return res.sendStatus(200);
};
