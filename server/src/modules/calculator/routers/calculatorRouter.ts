import { Router } from "express";

import { expressionValidation } from "../middlewares/expressionValidationMiddleware";
import { historyValidation } from "../middlewares/historyValidationMiddleware";
import { calculatorController } from "../controllers/calculator-controller";

const calculatorRouter = Router()

calculatorRouter.post('/calculator/calculate', expressionValidation, calculatorController.calculate)

calculatorRouter.get('/calculator/operations', calculatorController.getOperations)
calculatorRouter.get('/calculator/history', historyValidation, calculatorController.getHistory)

export { calculatorRouter }
