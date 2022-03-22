import express from 'express';
import fetch from 'cross-fetch';
import Context from '@middleware/context';

const userMe = 'https://discord.com/api/users/@me';

const me = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const ctx = Context.get(req);

  const meResponse = await fetch(userMe, {
    headers: {
      Authorization: `Bearer ${ctx?.access_token}`,
    },
  });

  if (!meResponse.ok) {
    return res.sendStatus(meResponse.status);
  }

  const me = await meResponse.json();
  return res.send(me);
};

export default me;