import { Router } from "express";

import { getHistory, getOperations, calculate } from "../controllers";
import { expressionValidation } from "../middlewares/expressionValidationMiddleware";

const calculatorRouter = Router()

calculatorRouter.post('/calculate', expressionValidation, calculate)

calculatorRouter.get('/operations', getOperations)
calculatorRouter.get('/history', getHistory)

export { calculatorRouter }
