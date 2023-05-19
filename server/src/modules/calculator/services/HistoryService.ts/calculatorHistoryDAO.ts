import { JsonDB } from "repositories/JsonDB"

export interface IHistoryItem {
    expression: string,
    result: number
}

export interface IHistoryRepository {
    setItem: (item: IHistoryItem) => Promise<void>
    getAll: () => Promise<IHistoryItem[]>
    countHistoryItems: (count: number) => Promise<IHistoryItem[]>
}

export class CalculatorHistoryDAO implements IHistoryRepository {
    private db: JsonDB<IHistoryItem>
    private maxSize = 20

    constructor(db: JsonDB<IHistoryItem>) {
        this.db = db
    }

    async getAll(): Promise<IHistoryItem[]> {
        return this.db.getAll()
    }

    async countHistoryItems(count: number): Promise<IHistoryItem[]> {
        return this.db.count(count)
    }

    async getItem(expression: string): Promise<IHistoryItem | null> {
        return this.db.getItem({ field: "expression", value: expression });
    }

    async setItem(item: IHistoryItem): Promise<void> {
        await this.db.setItem(item)

        if (this.db.DBsize > this.maxSize) {
            await this.db.pop()
        }
    }
}

const db = new JsonDB<IHistoryItem>('./src/data/history.json')

const calculatorHistoryDAO = new CalculatorHistoryDAO(db)

export { calculatorHistoryDAO }