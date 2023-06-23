import { logger } from "@modules/common/logger";
import { IHistoryItem, calculatorHistoryDAO } from "../DAO/calculator-history-dao";

export class CalculatioNHistoryService {
    private maxHistoryLength = Number(process.env.CALCULATOR_HISTORY_MAX_SIZE)

    async getHistory(limit = 5): Promise<IHistoryItem[]> {
        try {
            logger.info(`Getting history with limit: ${limit}`)
            return calculatorHistoryDAO.getHistory(limit)
        } catch (error) {
            logger.error(`Error while getting history with limit ${limit} at HistoryService`, error)
            throw error
        }
    }

    async addHistoryItem(data: IHistoryItem): Promise<void> {
        try {
            await calculatorHistoryDAO.createHistoryItem(data)

            const historyLength = await this.getHistoryLength()

            if (historyLength > this.maxHistoryLength) {
                calculatorHistoryDAO.deleteHistoryItem('created_at = (SELECT MIN(created_at) FROM calculatorHistory)')
            }

        } catch (error) {
            logger.error(`Error while setting new item ${data} at HistoryService`, error)
            throw error
        }
    }

    async getHistoryLength(): Promise<number> {
        try {
            return calculatorHistoryDAO.getLength()
        } catch (error) {
            logger.error(`Failed get history length at HistoryService`, error)
            throw error
        }

    }
}

export const calculatioNHistoryService = new CalculatioNHistoryService()