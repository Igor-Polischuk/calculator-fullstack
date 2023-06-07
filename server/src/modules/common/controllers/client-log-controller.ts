import { Request, Response } from "express"
import { body, matchedData } from "express-validator"
import winston from "winston"

import { validationMiddleware } from "@middlewares/validationMiddleware"
import { ErrorFactory } from "@utils/AppErrors/ErrorFactory"

import { getLoggerConfig } from "../configs/logger-config"

const clientLogger = winston.createLogger({
    ...getLoggerConfig('client'),
    format: winston.format.printf(({ message }) => {
        return `${message}`;
    })
})

export class ClientLogController {
    static saveLog(req: Request, res: Response) {
        const { message } = matchedData(req)
        clientLogger.info(message)
        res.send('logged')
    }

    static validateClientLogRequest = validationMiddleware([
        body('message')
            .notEmpty()
            .withMessage(ErrorFactory.MissingParameterError('message', 'body'))
    ])
}