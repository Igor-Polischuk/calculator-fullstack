import { JsonDB } from "repositories/JsonDB"
import { PostgreSQL } from "repositories/PostgreSQL"
import { IDataBase } from "repositories/database"

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
    private db: IDataBase<IHistoryItem>
    private maxSize = 20

    constructor(db: IDataBase<IHistoryItem>) {
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
        const length = await this.db.getLength()
        console.log(length)

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