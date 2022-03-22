require('module-alias/register');
require('dotenv').config();
import { logger } from '@middleware/logger';
import { buildServer } from './buildServer';

const app = buildServer();

app.listen(process.env.PORT, () => {
  logger.info(`listening on ${process.env.PORT}`);
});

process.on('uncaughtException', (err) => {
  logger.crit(err.message);
  process.exit(1);
});
