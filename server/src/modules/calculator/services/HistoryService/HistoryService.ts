import { logger } from "@modules/common/logger";
import { IHistoryItem, calculatorHistoryDAO } from "./calculatorHistoryDAO";

export class HistoryService {
    async getHistory(limit = 5): Promise<IHistoryItem[]> {
        try {
            return await calculatorHistoryDAO.getHistory(limit)
        } catch (error) {
            logger.error(`Error while getting history with limit ${limit} at HistoryService`)
            throw error
        }
    }

    async addHistoryItem(data: IHistoryItem): Promise<void> {
        try {
            await calculatorHistoryDAO.setItem(data)
        } catch (error) {
            logger.error(`Error while setting new item ${data} at HistoryService`)
            throw error
        }
    }

    async removeLast(): Promise<void> {
        await calculatorHistoryDAO.removeLast()
    }

    async getHistoryLength(): Promise<number> {
        return (await calculatorHistoryDAO.getAll()).length
    }
}

export const historyService = new HistoryService()