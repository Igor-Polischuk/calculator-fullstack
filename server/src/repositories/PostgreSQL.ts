import { AppError } from '@utils/AppErrors/AppError';
import { Pool } from "pg";
import { DataTypeExtended, IDataBase, IGetItemParams } from './IDatabase';

interface ITableFields {
    name: string
    type: string
    constraints?: string[]
}

interface IPostgreSQLParams {
    tableName: string,
    fields: ITableFields[]
}

export class PostgreSQL<DataType> implements IDataBase<DataType>{
    private pool
    private tableName

    constructor(params: IPostgreSQLParams) {
        this.pool = new Pool({
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST || 'localhost',
        })

        this.tableName = params.tableName
        this.createTable(params)
    }

    async getLength(): Promise<number> {
        const total = await this.query<{ total: string }[]>('SELECT COUNT(*) AS total FROM history')
        return Number(total[0].total)
    }

    async getAll(): Promise<DataTypeExtended<DataType>[]> {
        const query = `SELECT * from ${this.tableName}`

        return await this.query<DataTypeExtended<DataType>[]>(query)
    }

    async count(count: number): Promise<DataTypeExtended<DataType>[]> {
        const subquery = `(SELECT * FROM ${this.tableName} ORDER BY id DESC LIMIT ${count}) AS subquery`;
        const query = `SELECT * FROM ${subquery} ORDER BY id`;

        return await this.query<DataTypeExtended<DataType>[]>(query)
    }

    async setItem(item: DataType): Promise<void> {
        const columns = Object.keys(item as object).join(', ')
        const values = Object.values(item as object).map(item => `'${item}'`).join(', ')
        const query = `INSERT INTO ${this.tableName} (${columns}, updated_at) VALUES (${values}, CURRENT_TIMESTAMP)`

        await this.query(query)
    }

    async deleteItem(params: IGetItemParams<DataType>): Promise<void> {
        const query = `DELETE FROM ${this.tableName} WHERE ${params.field as string} = '${params.value}'`

        await this.query(query)
    }

    async getItem(params: IGetItemParams<DataType>): Promise<DataType | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE ${params.field as string} = '${params.value}'`

        return (await this.query<DataType[]>(query))[0]
    }

    async pop(): Promise<void> {
        const query = `DELETE FROM history WHERE created_at = (SELECT MIN(created_at) FROM ${this.tableName})`

        await this.query(query)
    }

    private async query<T>(queryString: string): Promise<T> {
        try {
            const res = await this.pool.query(queryString)
            return res.rows as T
        } catch (err) {
            console.log(err);
            throw AppError.getErrorFrom(err)
        }
    }

    private async createTable(params: IPostgreSQLParams) {
        const id = { name: 'id', type: 'SERIAL', constraints: ['PRIMARY KEY '] }
        const created = { name: 'created_at', type: 'TIMESTAMP ', constraints: ['DEFAULT', 'CURRENT_TIMESTAMP'] }
        const updated = { name: 'updated_at', type: 'TIMESTAMP ', constraints: ['DEFAULT', 'CURRENT_TIMESTAMP'] }
        const fieldsWithId = [...params.fields, id, created, updated]
        const fieldsQuery = fieldsWithId.map(field => this.getFieldQuery(field)).join(', ');

        const query = `CREATE TABLE IF NOT EXISTS "${params.tableName}" (${fieldsQuery});`;

        await this.query(query)
    }

    private getFieldQuery(field: ITableFields): string {
        const constraintsQuery = field.constraints ? field.constraints.join(' ') : '';
        return `"${field.name}" ${field.type} ${constraintsQuery}`;
    }
}