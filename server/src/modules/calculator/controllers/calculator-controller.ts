import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import { HistoryService } from "../services/HistoryService.ts/HistoryService";
import { calculateExpression } from "../services/expressionCalculation/ExpressionCalculatorService";
import { IOperationsList, getOperationsList } from "../services/operations-list";
import { responseHandler } from "@utils/decorators/responseHandler";

export class CalculatorController {

    @responseHandler
    static getOperations(req: Request, res: Response): IOperationsList[] {
        return getOperationsList()
    }

    @responseHandler
    static async getHistory(req: Request, res: Response, next: NextFunction) {
        const history = await HistoryService.getLastFiveHistoryItems()
        return { history }
    }

    @responseHandler
    static async calculate(req: Request, res: Response, next: NextFunction) {
        const { expression } = matchedData(req)
        const result = calculateExpression(expression)

        return { result, expression }
    }
}
