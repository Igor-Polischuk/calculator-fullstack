import { AppError } from "@errors/AppError";
import { calculateExpression } from "@services/calculatorService/expressionCalculation/ExpressionCalculatorService";
import { ResponseFormatter } from "@utils/ResponseFormatter";
import { Request, Response } from "express";
import { matchedData } from "express-validator";

export function getResult(req: Request, res: Response): void {
    const { expression } = matchedData(req)

    try {
        const result = calculateExpression(expression)
        const responseFormat = new ResponseFormatter({ data: { result, expression } }).json()
        res.send(responseFormat)
    } catch (e) {
        const error = AppError.getErrorFrom(e);
        const responseFormat = new ResponseFormatter({ error }).json()
        res.status(error.status).send(responseFormat)
    }
}