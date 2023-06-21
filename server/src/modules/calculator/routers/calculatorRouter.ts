import { Router } from "express";

import { expressionValidationMiddleware } from "../middlewares/expressionValidationMiddleware";
import { historyValidation } from "../middlewares/historyValidationMiddleware";
import { calculatorController } from "../controllers/calculator-controller";

const calculatorRouter = Router()

calculatorRouter.post('/calculator/calculate', expressionValidationMiddleware, calculatorController.calculate)

calculatorRouter.get('/calculator/operations', calculatorController.getOperations)
calculatorRouter.get('/calculator/history', historyValidation, calculatorController.getHistory)

export { calculatorRouter }
