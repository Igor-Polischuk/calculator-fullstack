import { AppError } from "@errors/AppError";
import { calculateExpression } from "@services/calculatorService/expressionCalculation/ExpressionCalculatorService";
import { ResponseFormatter } from "@utils/ResponseFormatter";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { JsonDB } from "repositories/history-repository/JsonDB";

export async function getResult(req: Request, res: Response): Promise<void> {
    const { expression } = matchedData(req)
    const db = new JsonDB('./src/data/history.json')

    try {
        const result = calculateExpression(expression)
        const data = { result, expression }
        const responseFormat = new ResponseFormatter({ data }).json()

        db.setItem(data)
        res.send(responseFormat)
    } catch (e) {
        const error = AppError.getErrorFrom(e);
        const responseFormat = new ResponseFormatter({ error }).json()
        res.status(error.status).send(responseFormat)
    }
}