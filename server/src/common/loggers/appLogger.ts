import winston from "winston";

const levels = ['info', 'error', 'warn']

const appLogger = winston.createLogger({
    transports: levels.map(level => new winston.transports.File({
        filename: `logs/app/${level}.log`,
        level: level
    })),

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            const { timestamp, level, message, meta } = info;
            return `[${timestamp}] ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`;
        })
    )
})

if (process.env.NODE_ENV !== 'production') {
    appLogger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export { appLogger }
