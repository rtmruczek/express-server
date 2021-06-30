import { Request, Response } from 'express';

export type ExpressHandler = (Request, Response) => {};
