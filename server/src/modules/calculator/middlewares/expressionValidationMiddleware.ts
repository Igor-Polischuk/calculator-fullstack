import { body } from "express-validator";

import { requestValidator } from "@utils/requestValidator";
import { validateExpression } from "@modules/calculator/services/expressionValidation/validateExpression";
import { ErrorFactory } from "@utils/AppErrors/ErrorFactory";

export const expressionValidation = requestValidator([
    body('expression')
        .notEmpty()
        .withMessage(ErrorFactory.MissingParameterError('expression', 'body'))
        .custom(validateExpression)
])