import { database } from "@modules/database"
import { calculatorHistoryModel } from "../models/calculation-history"

export interface IHistoryItem {
    expression: string
    result: number
}

export class CalculatorHistoryDAO {
    private tableName = 'calculatorHistory'

    constructor() {
        database.createTable(this.tableName, calculatorHistoryModel)
    }

    async getHistory(limit?: number): Promise<IHistoryItem[]> {
        let query = `SELECT * from "${this.tableName}"`

        if (limit) {
            query += ` LIMIT ${limit}`
        }

        const history = await database.query<IHistoryItem[]>(query)

        return history
    }

    async getLength(): Promise<number> {
        const query = `SELECT COUNT(*) AS row_count FROM "${this.tableName}"`

        return database.query<number>(query)
    }


    async createHistoryItem(item: IHistoryItem): Promise<void> {
        const query = `INSERT INTO "${this.tableName}" (expression, result, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)`
        const values = [item.expression, item.result];

        await database.query(query, values)
    }

    async getHistoryItem(expression: string): Promise<IHistoryItem | null> {
        const query = `SELECT * FROM "${this.tableName}" WHERE expression = '${expression}'`

        return (await database.query<IHistoryItem[]>(query))[0]
    }

    async deleteHistoryItem(condition: string): Promise<void> {
        const query = `DELETE FROM "${this.tableName}" WHERE ${condition}`

        await database.query(query)
    }
}

const calculatorHistoryDAO = new CalculatorHistoryDAO()

export { calculatorHistoryDAO }