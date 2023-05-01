import { Router } from "express";

import { getHistory, getOperations, getResult } from "@controllers/calculatorController";
import { expressionValidation } from "middlewares/expressionValidationMiddleware";

const calculatorRouter = Router()

calculatorRouter.get('/resultOF', expressionValidation, getResult)
calculatorRouter.get('/operations', getOperations)
calculatorRouter.get('/history', getHistory)

export { calculatorRouter }
