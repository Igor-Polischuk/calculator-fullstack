import winston from "winston";

interface ICreateLoggerParams {
    loggerName: string
    loggerLevels: string[]
}

export function createLogger({ loggerLevels, loggerName }: ICreateLoggerParams) {
    return winston.createLogger({
        transports: loggerLevels.map(level => new winston.transports.File({
            filename: `logs/${loggerName}/${level}.log`,
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
}