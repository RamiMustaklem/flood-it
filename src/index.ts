import app from './app';
import * as http from 'http';
import logger from './config/logger';
import { setBaseDir, makeDataDir } from './utils/ioUtils';
import path from 'path';

const currentAppPath = path.join(__dirname, '../');
/**
 * Set the app base path to the root path of the application outside of dist folder
 * */
setBaseDir(currentAppPath);

/**
 * Create the data directory if it doesn't exist
 */
makeDataDir(currentAppPath).then();

/* TODO: Move this to environment variables */
// keeping this in order to be easier to launch the app without creating a .env file elsewhere
const port = 5000;

let server: http.Server;

server = app.listen(port, () => {
  logger.info(`Listening to port ${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
