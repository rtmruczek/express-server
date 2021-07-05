import { RequestHandler } from 'express';
import db from '../db';
import { logger } from '../middleware/logger';

interface RegisterRequestSignature {
  email: string;
  password: string;
}

export const register: RequestHandler<any, any, RegisterRequestSignature> =
  async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
      return res.send(400);
    }

    const user = await db.getUniqueUserByEmail(req.body.email);
    if (!!user) {
      logger.log('warn', 'attempted to register with same email');
    }

    res.set('Content-Type', 'application/json');
    return res.status(200).json({});
  };
