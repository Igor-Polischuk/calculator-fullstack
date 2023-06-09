import { Connection } from "./Services/Connection"
import { SQLDatabase } from "./Services/SQLDatabase"

const calculatorDatabaseConnection = new Connection({
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || 'localhost',
})

const database = new SQLDatabase(calculatorDatabaseConnection)

export { database }