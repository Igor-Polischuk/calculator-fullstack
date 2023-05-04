import { query } from "express-validator";

import { AppError } from "@errors/AppError";
import { ErrorType } from "@errors/error-type";
import { validationMiddleware } from "middlewares/validationMiddleware";
import { validateExpression } from "@modules/calculator/services/expressionValidation/validateExpression";

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