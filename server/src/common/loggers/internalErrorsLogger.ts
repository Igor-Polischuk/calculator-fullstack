import winston from "winston";
import expressWinston from 'express-winston'


export const internalErrorsLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            filename: 'logs/app/logsInternalErrors.log'
        })
    ],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.printf(({ level, meta, timestamp }) => {
            return `${timestamp} ${level}: ${meta.message}`
        })

    )
})
