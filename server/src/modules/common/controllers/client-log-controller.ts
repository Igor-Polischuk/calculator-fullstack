import { Request, Response } from "express"
import { body, matchedData } from "express-validator"
import winston from "winston"

import { validationMiddleware } from "@middlewares/validationMiddleware"
import { responseHandler } from "@utils/decorators/responseHandler"
import { ErrorFactory } from "@utils/AppErrors/ErrorFactory"

import { getLoggerConfig } from "../configs/logger-config"

const clientLogger = winston.createLogger({
    ...getLoggerConfig('client'),
    format: winston.format.printf(({ message }) => {
        return `${message}`;
    })
})

class ClientLogController {

    @responseHandler
    saveLog(req: Request, res: Response) {
        const { message } = matchedData(req)
        clientLogger.info(message)

        return 'Log is success'
    }

    validateClientLogRequest = validationMiddleware([
        body('message')
            .notEmpty()
            .withMessage(ErrorFactory.MissingParameterError('message', 'body'))
    ])
}

export const clientLogController = new ClientLogController() 