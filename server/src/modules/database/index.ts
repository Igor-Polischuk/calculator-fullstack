import { Connection } from "./Connection"
import { calculatorHistoryModel } from "./models/CalculatorHistoryModel"


const calculatorDatabaseConnection = new Connection({
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || 'localhost',
})

calculatorDatabaseConnection.createTable('calculatorHistory', calculatorHistoryModel)

export { calculatorDatabaseConnection }