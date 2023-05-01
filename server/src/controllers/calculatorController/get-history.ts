import { Request, Response } from "express";

import { ResponseFormatter } from "@utils/ResponseFormatter";
import { calculatorHistory } from "repositories/history-repository/CalculatorHistory";

export async function getHistory(req: Request, res: Response): Promise<void> {
    const historyData = await calculatorHistory.getAll()
    const responseJSON = new ResponseFormatter({ data: { history: historyData } }).json()
    res.send(responseJSON)
}