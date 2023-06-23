import { AppError } from "@utils/AppErrors/AppError";
import { Connection } from "./Connection";
import { logger } from "@modules/common/logger";
import { ITableFields, Model } from "../Interfaces";

export class SQLDatabase {
    private connection

    constructor(connection: Connection) {
        this.connection = connection
    }

    async query<T>(queryString: string, values?: any[]): Promise<T> {
        try {
            const res = await this.connection.pool.query(queryString, values)
            return res.rows as T
        } catch (err) {
            console.log(err);
            logger.error('Failed query to database', err)
            throw AppError.getErrorFrom(err)
        }
    }

    async createTable(tableName: string, model: Model) {
        const id = { name: 'id', type: 'SERIAL', constraints: ['PRIMARY KEY '] }
        const created = { name: 'created_at', type: 'TIMESTAMP ', constraints: ['DEFAULT', 'CURRENT_TIMESTAMP'] }
        const updated = { name: 'updated_at', type: 'TIMESTAMP ', constraints: ['DEFAULT', 'CURRENT_TIMESTAMP'] }
        const fieldsWithId = [...model, id, created, updated]
        const fieldsQuery = fieldsWithId.map(field => this.getFieldQuery(field)).join(', ');

        const query = `CREATE TABLE IF NOT EXISTS "${tableName}" (${fieldsQuery});`;

        await this.query(query)
    }

    private getFieldQuery(field: ITableFields): string {
        const constraintsQuery = field.constraints ? field.constraints.join(' ') : '';
        return `"${field.name}" ${field.type} ${constraintsQuery}`;
    }
}