import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import path from 'path';
import { logger } from '@middleware/logger';

const jwtSecret = readFileSync(path.join('.keys', 'jwtprivate.pem')).toString();

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(req.url);

  const jwtString = req.headers['_jwt'] as string;
  jwt.verify(jwtString, jwtSecret);
  next();
}
