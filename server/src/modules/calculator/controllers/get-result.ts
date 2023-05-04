import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { calculateExpression } from "@modules/calculator/services/expressionCalculation/ExpressionCalculatorService";
import { calculatorHistory } from "repositories/history-repository/CalculatorHistory";
import { ResponseFormatter } from "@utils/ResponseFormatter";
import { AppError } from "@errors/AppError";

export async function getResult(req: Request, res: Response): Promise<void> {
    const { expression } = matchedData(req)

    try {
        const result = calculateExpression(expression)
        const data = { result, expression }
        const responseFormat = new ResponseFormatter({ data }).json()

        calculatorHistory.setItem(data)
        res.send(responseFormat)
    } catch (e) {
        const error = AppError.getErrorFrom(e);
        const responseFormat = new ResponseFormatter({ error }).json()
        res.status(error.status).send(responseFormat)
    }
}