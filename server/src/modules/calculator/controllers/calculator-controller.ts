import { calculatorHistoryDAO } from "repositories/history-repository/CalculatorHistory";
import { getOperationsList } from "../services/operations-list";
import { matchedData } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { calculateExpression } from "../services/expressionCalculation/ExpressionCalculatorService";
import { ResponseFormatter } from "@utils/ResponseFormatter";

export class CalculatorController {

    static getOperations(req: Request, res: Response) {
        const operation = getOperationsList()
        const response = new ResponseFormatter({ data: operation }).json()
        res.send(response)
    }

    static async getHistory(req: Request, res: Response, next: NextFunction) {
        try {
            const historyData = await calculatorHistoryDAO.getAll()
            const lastFive = historyData.slice(-5)
            const responseJSON = new ResponseFormatter({ data: { history: lastFive } }).json()

            res.send(responseJSON)
        } catch (error) {
            next(error)
        }
    }

    static async calculate(req: Request, res: Response, next: NextFunction) {
        const { expression } = matchedData(req)

        try {
            const result = calculateExpression(expression)
            const data = { result, expression }
            const responseFormat = new ResponseFormatter({ data }).json()

            res.send(responseFormat)
        } catch (error) {
            next(error)
        }
    }
}

// function handleErrors(target: any, key: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
//         try {
//             const result = await originalMethod.call(this, req, res, next);

//             const responseFormat = new ResponseFormatter({ data: result }).json();

//             res.send(responseFormat);
//         } catch (error) {
//             next(error);
//         }
//     }

//     return descriptor;
// }

// function sendJson(target: any, key: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (req: Request, res: Response, next: NextFunction) {
//         const result = originalMethod.call(this, req, res, next);

//         const responseFormat = new ResponseFormatter({ data: result }).json();

//         res.send(responseFormat);
//     }

//     return descriptor;
// }