import { getOperationsList } from "@services/calculatorService/operations-list";
import { ResponseFormatter } from "@utils/ResponseFormatter";
import { Request, Response } from "express";

export function getOperations(req: Request, res: Response): void {
    const operation = getOperationsList()
    const response = new ResponseFormatter({ data: operation }).json()
    res.send(response)
}