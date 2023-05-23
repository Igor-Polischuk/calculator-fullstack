import { AppError } from '@errors/AppError';
import { Pool } from "pg";
import { DataTypeExtended, IDataBase, IGetItemParams } from './database';

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
            password: 'root',
            port: 5432,
            user: 'admin',
            host: 'localhost',
            database: 'calculator'
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
        const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`

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
        const query = 'DELETE FROM history WHERE id = (SELECT MIN(id) FROM history)'

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
        const fieldsWithId = [...params.fields, id]
        const fieldsQuery = fieldsWithId.map(field => this.getFieldQuery(field)).join(', ');
        const query = `CREATE TABLE IF NOT EXISTS "${params.tableName}" (${fieldsQuery});`;

        await this.query(query)
    }

    private getFieldQuery(field: ITableFields): string {
        const constraintsQuery = field.constraints ? field.constraints.join(' ') : '';
        return `"${field.name}" ${field.type} ${constraintsQuery}`;
    }
}