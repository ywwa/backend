import winston from "winston";

const logger = winston.createLogger({
  level      : "info",
  format     : winston.format.json(),
  defaultMeta: { service: "deskify-api" },
  transports : [
    new winston.transports.File({
      filename: "./logs/error.log",
      level   : "error"
    }),
    new winston.transports.File({ filename: "./logs/combined.log" })
  ]
});

if ( process.env.NODE_ENV !== "prod" ) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level : "debug"
    })
  ),
  
  logger.add(
    new winston.transports.File({
      filename: "./logs/debug.log",
      level   : "debug"
    })
  )
};

export default logger;

