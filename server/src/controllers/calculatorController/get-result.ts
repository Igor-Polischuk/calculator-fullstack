import { AppError } from "@errors/AppError";
import { validateExpression } from "@services/calculatorService/expressionValidation/validateExpression";
import { ResponseFormatter } from "@utils/ResponseFormatter";
import { Request, Response } from "express";

export function getResult(req: Request, res: Response): void {
    try {
        validateExpression(req.query.expression as string)
        res.send(new ResponseFormatter({ status: 200, data: { message: 'success' } }))
    } catch (error) {
        res.send(new ResponseFormatter({ error: AppError.getErrorFrom(error) }))
    }
}