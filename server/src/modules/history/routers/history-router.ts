import { Router } from "express";
import { calculationHistoryController } from "../controllers/calculation-history-controller";
import { historyValidation } from "../middlewares/history-validation-middleware";

const calculatorRouter = Router()

calculatorRouter.get('/history/calculation', historyValidation, calculationHistoryController.getHistory)

export { calculatorRouter }
