const winston = require('winston');
const expressWinston = require('express-winston');
const fs = require('fs');
const path = require('path');

const logFolder = 'logs';
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(logFolder, '/request.log') }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(logFolder, '/error.log') }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
