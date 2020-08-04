const winston = require('winston');

const { combine, timestamp, prettyPrint } = winston.format;

module.exports = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${__dirname}/../../logs/${Date.now()}-all-botter.log`
    })
  ]
});
