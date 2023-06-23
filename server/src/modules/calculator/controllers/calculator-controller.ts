import { matchedData } from "express-validator";
import { Request } from "express";

import { calculatioNHistoryService } from "@modules/history/services/calculation-history";
import { IListDataResponseParams } from "@modules/common/interfaces/IListData";
import { responseHandler } from "@utils/decorators/responseHandler";
import { logger } from "@modules/common/logger";

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
    async calculate(req: Request) {
        const { expression } = matchedData(req) as { expression: string }

        logger.info(`Calculate expression: ${expression}`)

        const result = calculatorService.calculateExpression(expression)
        const expressionResult = { result, expression }

        logger.info(`Calculation result: ${expression} = ${result}`)

        await calculatioNHistoryService.addHistoryItem(expressionResult)

        return expressionResult
    }
}

export const calculatorController = new CalculatorController()