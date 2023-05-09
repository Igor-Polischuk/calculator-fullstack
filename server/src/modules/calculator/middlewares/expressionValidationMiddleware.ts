import { body } from "express-validator";

import { validationMiddleware } from "middlewares/validationMiddleware";
import { validateExpression } from "@modules/calculator/services/expressionValidation/validateExpression";
import { ErrorFactory } from "@errors/ErrorFactory";

export const expressionValidation = validationMiddleware([
    body('expression')
        .notEmpty()
        .withMessage(ErrorFactory.MissingParameterError('expression', 'body'))
        .custom(validateExpression)
])