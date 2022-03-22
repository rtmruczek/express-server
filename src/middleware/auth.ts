import { NextFunction, Request, Response } from 'express';
import Context from './context';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers['cookie']) {
    const discordCookie = JSON.parse(req.cookies['discordCookie']);
    const ctx = Context.get(req);
    if (!ctx) {
      throw new Error('context not found');
    }
    ctx.access_token = discordCookie.access_token;
    return next();
  } else {
    return res.sendStatus(401);
  }
}
