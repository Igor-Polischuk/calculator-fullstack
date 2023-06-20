import { JsonDB } from "@repositories/JsonDB"
import { PostgreSQL } from "@repositories/PostgreSQL"
import { IDataBase } from "@repositories/IDatabase"

export interface IHistoryItem {
    expression: string,
    result: number
}

export interface IHistoryDAO {
    setItem: (item: IHistoryItem) => Promise<void>
    getAll: () => Promise<IHistoryItem[]>
    getHistory: (count: number) => Promise<IHistoryItem[]>
}

class CalculatorHistoryDAO implements IHistoryDAO {
    private db: IDataBase<IHistoryItem>
    private maxSize = Number(process.env.CALCULATOR_HISTORY_MAX_SIZE)

    constructor(db: IDataBase<IHistoryItem>) {
        this.db = db
    }

    async getAll(): Promise<IHistoryItem[]> {
        return this.db.getAll()
    }

    async getHistory(limit: number): Promise<IHistoryItem[]> {
        return this.db.count(limit)
    }

    async removeLast(): Promise<void> {
        await this.db.removeLast()
    }

    async getItem(expression: string): Promise<IHistoryItem | null> {
        return this.db.getItem({ field: "expression", value: expression });
    }

    async setItem(item: IHistoryItem): Promise<void> {
        await this.db.setItem(item)
        const length = await this.db.getLength()

        if (length > this.maxSize) {
            await this.db.pop()
        }
    }
}

const jsonDB = new JsonDB<IHistoryItem>('./src/data/history.json')
const postgresDB = new PostgreSQL<IHistoryItem>({
    tableName: 'history',
    fields: [
        { name: 'expression', type: 'TEXT', constraints: ['NOT NULL'] },
        { name: 'result', type: 'FLOAT', constraints: ['NOT NULL'] }
    ]
})

const calculatorHistoryDAO = new CalculatorHistoryDAO(postgresDB)

export { calculatorHistoryDAO }