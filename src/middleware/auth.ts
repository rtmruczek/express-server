import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import path from 'path';

const jwtSecret = readFileSync(path.join('.keys', 'jwtprivate.pem')).toString();

const publicUrls = ['/login', '/register'];

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (publicUrls.includes(req.url)) {
    return next();
  }
  const jwtString = req.headers['_jwt'] as string;
  jwt.verify(jwtString, jwtSecret);
  next();
}
