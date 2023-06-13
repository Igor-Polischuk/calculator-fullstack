import { matchedData } from "express-validator";
import { Request, Response } from "express";

import { IListDataResponseParams } from "@modules/common/interfaces/IListData";
import { responseHandler } from "@utils/decorators/responseHandler";
import { logger } from "@modules/common/logger";

import { IHistoryItem } from "../services/HistoryService/calculatorHistoryDAO";
import { historyService } from "../services/HistoryService/HistoryService";
import { IOperationsList } from "../services/interfaces/IOperationList";
import { calculatorService } from "../services/CalculatorService";

class CalculatorController {

    @responseHandler
    getOperations(req: Request, res: Response): IListDataResponseParams<IOperationsList> {
        const operations = calculatorService.getOperations()
        logger.info(`Getting operations`)

        return {
            items: operations,
            total: operations.length
        }
    }

    @responseHandler
    async getHistory(req: Request, res: Response): Promise<IListDataResponseParams<IHistoryItem>> {
        const data = matchedData(req)
        const limit = Number(data.limit) || 5

        logger.info(`Getting history`)

        const history = await historyService.countHistoryItems(limit)
        const historyList = {
            items: history,
            total: await historyService.getHistoryLength(),
        }

        return historyList
    }

    @responseHandler
    async calculate(req: Request, res: Response) {
        const { expression } = matchedData(req)

        logger.info(`Calculate expression: ${expression}`)

        const result = calculatorService.calculateExpression(expression)
        const expressionResult = { result, expression }

        logger.info(`Calculation result: ${expression} = ${result}`)

        await historyService.addHistoryItem(expressionResult)

        return expressionResult
    }
}

export const calculatorController = new CalculatorController()