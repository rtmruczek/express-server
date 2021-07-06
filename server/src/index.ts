require('dotenv').config();
import { logger } from '@middleware/logger';
import { buildServer } from './buildServer';

const app = buildServer();

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

process.on('uncaughtException', (err) => {
  logger.crit(err.message);
  process.exit(1);
});
