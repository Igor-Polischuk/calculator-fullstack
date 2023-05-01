import { ResponseFormatter } from "@utils/ResponseFormatter";
import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { CalculatorHistory, calculatorHistory } from "repositories/history-repository/CalculatorHistory";
import { JsonDB } from "repositories/history-repository/JsonDB";

export async function calculationCache(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { expression } = matchedData(req)

    const data = await calculatorHistory.getItem(expression)

    console.log(data);


    if (data) {
        console.log('data from cache');

        const responseFormat = new ResponseFormatter({ data }).json()
        res.send(responseFormat)
        return
    }

    next()
}   