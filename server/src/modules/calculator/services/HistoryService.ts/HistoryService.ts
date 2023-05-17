import { IHistoryItem, calculatorHistoryDAO } from "./calculatorHistoryDAO";

export class HistoryService {
    static async getLastFiveHistoryItems(): Promise<IHistoryItem[]> {
        return await calculatorHistoryDAO.countHistoryItems(5)
    }

    static async addHistoryItem(data: IHistoryItem): Promise<void> {
        await calculatorHistoryDAO.setItem(data)
    }
}