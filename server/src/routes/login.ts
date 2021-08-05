import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import path from 'path';

import db from '@db/index';

const jwtSecret = readFileSync(path.join('.keys', 'jwtprivate.pem')).toString();

export interface LoginRequestSignature {
  email: string;
  password: string;
}

export const login: RequestHandler = async (
  req: Request<any, any, LoginRequestSignature>,
  res
) => {
  const { email, password } = req.body;
  const user = await db.getUniqueUserByEmail(email);

  if (!user || user.password !== password) {
    return res.sendStatus(401);
  }

  const jwtString = jwt.sign({ email }, jwtSecret);
  res.set('_jwt', jwtString);
  return res.sendStatus(200);
};
