import { Router } from "express";
import { calculationHistoryController } from "../controllers/calculation-history-controller";
import { historyValidation } from "../middlewares/history-validation-middleware";

const historyRouter = Router()

historyRouter.get('/history/calculation', historyValidation, calculationHistoryController.getHistory)

export { historyRouter }
