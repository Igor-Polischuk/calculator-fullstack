import { Router } from "express";
import { query } from "express-validator";

import { getHistory, getOperations, getResult } from "@controllers/calculatorController";
import { validation } from "middlewares/validation";
import { AppError } from "@errors/AppError";
import { ErrorType } from "@errors/error-type";
import { validateExpression } from "@services/calculatorService/expressionValidation/validateExpression";

const calculatorRouter = Router()

calculatorRouter.get('/resultOF', [validation([
    query('expression')
        .notEmpty()
        .withMessage(new AppError({
            status: 400,
            message: 'Missing required parameter: expression',
            type: ErrorType.MissingParameter
        }))
        .custom(validateExpression)
]), getResult])

calculatorRouter.get('/operations', getOperations)
calculatorRouter.get('/history', getHistory)

export { calculatorRouter }
