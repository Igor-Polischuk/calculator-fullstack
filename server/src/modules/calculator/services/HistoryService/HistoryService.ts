import { IHistoryItem, calculatorHistoryDAO } from "./calculatorHistoryDAO";

export class HistoryService {
    async countHistoryItems(count: number): Promise<IHistoryItem[]> {
        return await calculatorHistoryDAO.countHistoryItems(count)
    }

    async addHistoryItem(data: IHistoryItem): Promise<void> {
        await calculatorHistoryDAO.setItem(data)
    }

    async removeLast(): Promise<void> {
        await calculatorHistoryDAO.removeLast()
    }

    async getHistoryLength(): Promise<number> {
        return (await calculatorHistoryDAO.getAll()).length
    }
}

export const historyService = new HistoryService()