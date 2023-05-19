import { Router } from "express";

import { expressionValidation } from "../middlewares/expressionValidationMiddleware";
import { CalculatorController } from "../controllers/calculator-controller";
import { historyValidation } from "../middlewares/historyValidationMiddleware";

const calculatorRouter = Router()

calculatorRouter.post('/calculator/calculate', expressionValidation, CalculatorController.calculate)

calculatorRouter.get('/calculator/operations', CalculatorController.getOperations)
calculatorRouter.get('/calculator/history', historyValidation, CalculatorController.getHistory)

export { calculatorRouter }
