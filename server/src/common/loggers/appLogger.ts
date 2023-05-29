import { createLogger } from "@utils/createLogger";
import winston from "winston";

const loggerLevels = ['info', 'error', 'warn']

const appLogger = createLogger({
    loggerName: 'app',
    loggerLevels
})

if (process.env.NODE_ENV !== 'production') {
    appLogger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export { appLogger }
