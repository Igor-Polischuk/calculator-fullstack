import { calculatorDatabaseConnection } from "@modules/database"

export interface IHistoryItem {
    expression: string
    result: number
}

export class CalculatorHistoryDAO {
    private tableName = 'calculatorHistory'

    async getHistory(limit?: number): Promise<IHistoryItem[]> {
        const query = `SELECT * from "${this.tableName}"`
        const history = await calculatorDatabaseConnection.query<IHistoryItem[]>(query)

        return history.slice(history.length - (limit || history.length))
    }

    async getLength(): Promise<number> {
        const query = `SELECT COUNT(*) AS row_count FROM "${this.tableName}"`

        return calculatorDatabaseConnection.query<number>(query)
    }


    async createHistoryItem(item: IHistoryItem): Promise<void> {
        const query = `INSERT INTO "${this.tableName}" (expression, result, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)`
        const values = [item.expression, item.result];

        await calculatorDatabaseConnection.query(query, values)
    }

    async getHistoryItem(expression: string): Promise<IHistoryItem | null> {
        const query = `SELECT * FROM "${this.tableName}" WHERE expression = '${expression}'`

        return (await calculatorDatabaseConnection.query<IHistoryItem[]>(query))[0]
    }

    async deleteHistoryItem(condition: string): Promise<void> {
        const query = `DELETE FROM "${this.tableName}" WHERE ${condition}`

        await calculatorDatabaseConnection.query(query)
    }
}

const calculatorHistoryDAO = new CalculatorHistoryDAO()

export { calculatorHistoryDAO }