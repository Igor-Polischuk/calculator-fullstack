import { Request, Response } from "express";

export function getHistory(req: Request, res: Response): void {
    res.send('Getting history...')
}