import { ErrorFactory } from "@errors/ErrorFactory";
import { query } from "express-validator";
import { validationMiddleware } from "middlewares/validationMiddleware";

const limitError = ErrorFactory.IncorrectParameter('The "limit" parameter must take integer values ​​from 1 to 20')

export const historyValidation = validationMiddleware([
    query('limit')
        .optional()
        .isNumeric()
        .withMessage(limitError)
        .isInt({ min: 1, max: 20 })
        .withMessage(limitError)
])