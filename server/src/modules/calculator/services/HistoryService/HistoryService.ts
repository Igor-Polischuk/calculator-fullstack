import { logger } from "@modules/common/logger";
import { IHistoryItem, calculatorHistoryDAO } from "./calculatorHistoryDAO";

export class HistoryService {
    async getHistory(limit = 5): Promise<IHistoryItem[]> {
        try {
            logger.info(`Getting history with limit: ${limit}`)
            return await calculatorHistoryDAO.getHistory(limit)
        } catch (error) {
            logger.error(`Error while getting history with limit ${limit} at HistoryService`, error)
            throw error
        }
    }

    async addHistoryItem(data: IHistoryItem): Promise<void> {
        try {
            await calculatorHistoryDAO.setItem(data)
        } catch (error) {
            logger.error(`Error while setting new item ${data} at HistoryService`, error)
            throw error
        }
    }

    async removeLast(): Promise<void> {
        try {
            await calculatorHistoryDAO.removeLast()
        } catch (error) {
            logger.error(`Error while removing last item from history at HistoryService`, error)
            throw error
        }
    }

    async getHistoryLength(): Promise<number> {
        try {
            return (await calculatorHistoryDAO.getAll()).length
        } catch (error) {
            logger.error(`Failed get history length at HistoryService`, error)
            throw error
        }

    }
}

export const historyService = new HistoryService()