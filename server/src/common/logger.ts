import winston from "winston";

export const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: './logs/logs.log',
            level: 'info'
        })
    ],


    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            const { timestamp, level, message, meta } = info;
            return `[${timestamp}] ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`;
        })
    )
})

