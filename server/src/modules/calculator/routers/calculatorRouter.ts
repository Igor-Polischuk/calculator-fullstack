import { Router } from "express";

import { expressionValidation } from "../middlewares/expressionValidationMiddleware";
import { CalculatorController } from "../controllers/calculator-controller";

const calculatorRouter = Router()

calculatorRouter.post('/calculate', expressionValidation, CalculatorController.calculate)

calculatorRouter.get('/operations', CalculatorController.getOperations)
calculatorRouter.get('/history', CalculatorController.getHistory)

export { calculatorRouter }
