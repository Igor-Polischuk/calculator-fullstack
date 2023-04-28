import { Request, Response } from "express";

export function getOperations(req: Request, res: Response): void {
    res.send('Getting operations...')
}