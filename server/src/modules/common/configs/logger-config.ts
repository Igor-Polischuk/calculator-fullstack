import winston from "winston";

export function getLoggerConfig(filename: string,) {
    return {
        transports: [
            new winston.transports.File({
                filename: `./logs/${filename}.log`,
                level: 'info'
            }),
        ],

        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(info => {
                const { timestamp, level, message, meta } = info;
                if (level === 'info') {
                    return `[${timestamp}] ${level}: ${message}`;
                }
                return `[${timestamp}] ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`;
            })
        )
    }
}