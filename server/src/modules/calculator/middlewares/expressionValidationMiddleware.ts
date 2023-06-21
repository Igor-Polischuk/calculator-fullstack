import { body } from "express-validator";

import { ErrorFactory } from "@utils/AppErrors/ErrorFactory";
import { requestValidator } from "@utils/requestValidator";

export const expressionValidationMiddleware = requestValidator([
    body('expression')
        .notEmpty()
        .withMessage(ErrorFactory.MissingParameterError('expression', 'body'))
        .isString()
        .isLength({ max: 1500 })
        .withMessage(ErrorFactory.IncorrectParameter('The expression must be a string of up to 1500 characters'))
])