import { matchedData } from "express-validator";
import { Request, Response } from "express";

import { IListDataResponseParams } from "@modules/common/interfaces/IListData";
import { responseHandler } from "@utils/decorators/responseHandler";
import { logger } from "@modules/common/logger";

import { IHistoryItem } from "../services/HistoryService/CalculatorHistoryDAO";
import { historyService } from "../services/HistoryService/HistoryService";
import { IOperationsList } from "../services/interfaces/IOperationList";
import { calculatorService } from "../services/CalculatorService";

class CalculatorController {

    @responseHandler
    getOperations(): IListDataResponseParams<IOperationsList> {
        const operations = calculatorService.getOperations()

        return {
            items: operations,
            total: operations.length
        }
    }

    @responseHandler
    async getHistory(req: Request): Promise<IListDataResponseParams<IHistoryItem>> {
        const data = matchedData(req) as { limit: string }
        const limit = Number(data.limit)

        const history = await historyService.getHistory(limit)
        const historyList = {
            items: history,
            total: await historyService.getHistoryLength(),
        }

        return historyList
    }

    @responseHandler
    async calculate(req: Request) {
        const { expression } = matchedData(req) as { expression: string }

        logger.info(`Calculate expression: ${expression}`)

        const result = calculatorService.calculateExpression(expression)
        const expressionResult = { result, expression }

        logger.info(`Calculation result: ${expression} = ${result}`)

        await historyService.addHistoryItem(expressionResult)

        return expressionResult
    }
}

export const calculatorController = new CalculatorController()