import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { HistoryService } from "../services/HistoryService.ts/HistoryService";
import { calculateExpression } from "../services/expressionCalculation/ExpressionCalculatorService";
import { IOperationsList, getOperationsList } from "../services/operations-list";
import { responseHandler } from "@utils/decorators/responseHandler";
import { ListDataResponse } from "@utils/ListDataResponse";

export class CalculatorController {

    @responseHandler
    static getOperations(req: Request, res: Response): ListDataResponse {
        const operations = getOperationsList()
        return new ListDataResponse({
            items: operations,
            total: operations.length
        })
    }

    @responseHandler
    static async getHistory(req: Request, res: Response) {
        const data = matchedData(req)
        const limit = Number(data.limit) || 5

        const history = await HistoryService.getLastLastHistoryItems(limit)
        const historyList = new ListDataResponse({
            items: history,
            total: await HistoryService.getHistoryLength()
        })

        return historyList
    }

    @responseHandler
    static async calculate(req: Request, res: Response) {
        const { expression } = matchedData(req)
        const result = calculateExpression(expression)
        const expressionResult = { result, expression }

        await HistoryService.addHistoryItem(expressionResult)

        return expressionResult
    }
}
