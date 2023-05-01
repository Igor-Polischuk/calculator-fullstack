import { IDBItem, IHistoryRepository } from "./IHistoryRepository";
import { JsonDB } from "./JsonDB";

export class CalculatorHistory implements IHistoryRepository {
    private db: JsonDB

    constructor(db: JsonDB) {
        this.db = db
    }

    async getAll(): Promise<IDBItem[]> {
        return this.db.getAll()
    }

    async getItem(expression: string): Promise<IDBItem | null> {
        return this.db.getItem(expression);
    }

    async setItem(item: IDBItem): Promise<void> {
        this.db.setItem(item)
    }
}

const db = new JsonDB('./src/data/history.json')

const calculatorHistory = new CalculatorHistory(db)

export { calculatorHistory }