import { Request } from "express";
import { matchedData } from "express-validator";

import { IListDataResponseParams } from "@modules/common/interfaces/IListData";
import { responseHandler } from "@utils/decorators/responseHandler";
import { logger } from "@modules/common/logger";
import { IHistoryItem } from "@modules/history/DAO/calculator-history-dao";
import { calculatioNHistoryService } from "../services/calculation-history";

class CalculationHistoryController {

    @responseHandler

    @responseHandler
    async getHistory(req: Request): Promise<IListDataResponseParams<IHistoryItem>> {
        const data = matchedData(req) as { limit: string }
        const limit = Number(data.limit)

        const history = await calculatioNHistoryService.getHistory(limit)
        const historyList = {
            items: history,
            total: await calculatioNHistoryService.getHistoryLength(),
        }

        return historyList
    }
}

export const calculationHistoryController = new CalculationHistoryController()