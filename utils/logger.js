import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, align } = winston.format;

// Define log format
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
     const metaString = Object.keys(metadata).length ? `\n${JSON.stringify(metadata, null, 2)}` : "";
     return `[${timestamp}] ${level}: ${message}${metaString}`;
});

// Create logger instance
const logger = winston.createLogger({
     level: process.env.LOG_LEVEL || "info", format: combine(
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.json()
     ),
     defaultMeta: { service: "furniture-shop" },
     transports: [
          // Write all logs with level `error` and below to `error.log`
          new winston.transports.File({
               filename: path.join("logs", "error.log"),
               level: "error",
               format: combine(timestamp(), logFormat),
          }),
          // Write all logs with level `info` and below to `combined.log`
          new winston.transports.File({
               filename: path.join("logs", "combined.log"),
               format: combine(timestamp(), logFormat),
          }),
     ],
});

// If we're not in production, log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest })`
if (process.env.NODE_ENV !== "production") {
     logger.add(
          new winston.transports.Console({
               format: combine(
                    colorize({ all: true }),
                    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                    align(),
                    logFormat
               ),
          })
     );
}

export default logger