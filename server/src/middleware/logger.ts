import winston from 'winston';
import expressWinston from 'express-winston';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});
const errorLoggerMiddleware = expressWinston.errorLogger(logger);

export { logger, errorLoggerMiddleware };
