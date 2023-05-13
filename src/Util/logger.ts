import * as ws from "winston";

const logger = ws.createLogger({
  level: "info",
  format: ws.format.json(),
  defaultMeta: { service: "deskify-express-api" },
  transports: [
    new ws.transports.File({
      filename: "./logs/error.log",
      level: "error"
    }),
    new ws.transports.File({
      filename: "./logs/combined.log"
    })
  ]
});

if ( process.env.NODE_ENV !== "prod" ) {
  logger.add(
    new ws.transports.Console({
      format: ws.format.simple(),
      level: "debug"
    })
  );

  logger.add(
    new ws.transports.File({
      filename: "./logs/debug.log",
      level: "debug"
    })
  );
};

export default logger;

