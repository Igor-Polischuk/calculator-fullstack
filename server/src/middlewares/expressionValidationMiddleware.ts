import { query } from "express-validator";
import { AppError } from "@errors/AppError";
import { ErrorType } from "@errors/error-type";
import { validateExpression } from "@services/calculatorService/expressionValidation/validateExpression";
import { validationMiddleware } from "./validationMiddleware";

export const expressionValidation = validationMiddleware([
    query('expression')
        .notEmpty()
        .withMessage(new AppError({
            status: 400,
            message: 'Missing required parameter: expression',
            type: ErrorType.MissingParameter
        }))
        .custom(validateExpression)
])