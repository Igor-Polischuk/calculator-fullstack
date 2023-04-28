import { getHistory, getOperations, getResult } from "@controllers/calculatorController";
import { Router } from "express";

const calculatorRouter = Router()

calculatorRouter.get('/resultOF', getResult)
calculatorRouter.get('/operations', getOperations)
calculatorRouter.get('/history', getHistory)

export { calculatorRouter }
