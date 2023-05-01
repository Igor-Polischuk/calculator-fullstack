import { Router } from "express";

import { getHistory, getOperations, getResult } from "@controllers/calculatorController";
import { expressionValidation } from "middlewares/expressionValidationMiddleware";
import { calculationCache } from "middlewares/calculationCacheMiddleware";

const calculatorRouter = Router()

calculatorRouter.get('/resultOF', expressionValidation, calculationCache, getResult)
calculatorRouter.get('/operations', getOperations)
calculatorRouter.get('/history', getHistory)

export { calculatorRouter }
