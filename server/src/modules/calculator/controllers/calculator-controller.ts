import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { HistoryService } from "../services/HistoryService.ts/HistoryService";
import { calculateExpression } from "../services/expressionCalculation/ExpressionCalculatorService";
import { IOperationsList, getOperationsList } from "../services/operations-list";
import { responseHandler } from "@utils/decorators/responseHandler";
import { IListDataResponseParams } from "interfaces/IListData";
import { IHistoryItem } from "../services/HistoryService.ts/calculatorHistoryDAO";

export class CalculatorController {

    @responseHandler
    static getOperations(req: Request, res: Response): IListDataResponseParams<IOperationsList> {
        const operations = getOperationsList()
        return {
            items: operations,
            total: operations.length
        }
    }

    @responseHandler
    static async getHistory(req: Request, res: Response): Promise<IListDataResponseParams<IHistoryItem>> {
        const data = matchedData(req)
        const limit = Number(data.limit) || 5

        const history = await HistoryService.getLastLastHistoryItems(limit)
        const historyList = {
            items: history,
            total: await HistoryService.getHistoryLength()
        }

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
