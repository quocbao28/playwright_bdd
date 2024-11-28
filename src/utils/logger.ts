import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: 'logs',
      filename: `running-test-${Date.now()}.log`,
    }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

export default logger;
