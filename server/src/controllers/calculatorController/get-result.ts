import { Request, Response } from "express";

export function getResult(req: Request, res: Response): void {
    res.send('Calculate...')
}