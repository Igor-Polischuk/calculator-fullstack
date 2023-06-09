import { IHistoryItem, calculatorHistoryDAO } from "./calculatorHistoryDAO";

export class HistoryService {
    static async countHistoryItems(count: number): Promise<IHistoryItem[]> {
        return await calculatorHistoryDAO.countHistoryItems(count)
    }

    static async addHistoryItem(data: IHistoryItem): Promise<void> {
        await calculatorHistoryDAO.setItem(data)
    }

    static async getHistoryLength(): Promise<number> {
        return (await calculatorHistoryDAO.getAll()).length
    }
}