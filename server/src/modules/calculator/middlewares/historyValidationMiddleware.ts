import { ErrorFactory } from "@utils/AppErrors/ErrorFactory";
import { requestValidator } from "@utils/requestValidator";
import { query } from "express-validator";

const limitError = ErrorFactory.IncorrectParameter('The "limit" parameter must take integer values ​​from 1 to 20')

export const historyValidation = requestValidator([
    query('limit')
        .optional()
        .isNumeric()
        .withMessage(limitError)
        .isInt({ min: 1, max: 20 })
        .withMessage(limitError)
])