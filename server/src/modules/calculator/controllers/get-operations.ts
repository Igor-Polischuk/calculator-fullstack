import { Request, Response } from "express";

import { getOperationsList } from "@modules/calculator/services/operations-list";
import { ResponseFormatter } from "@utils/ResponseFormatter";

export function getOperations(req: Request, res: Response): void {
    const operation = getOperationsList()
    const response = new ResponseFormatter({ data: operation }).json()
    res.send(response)
}