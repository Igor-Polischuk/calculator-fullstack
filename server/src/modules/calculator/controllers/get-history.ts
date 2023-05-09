import { Request, Response } from "express";

import { ResponseFormatter } from "@utils/ResponseFormatter";
import { calculatorHistoryDAO } from "repositories/history-repository/CalculatorHistory";

export async function getHistory(req: Request, res: Response): Promise<void> {
    const historyData = await calculatorHistoryDAO.getAll()
    const lastFive = historyData.slice(-5)
    const responseJSON = new ResponseFormatter({ data: { history: lastFive } }).json()
    res.send(responseJSON)
}