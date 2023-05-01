import { ResponseFormatter } from "@utils/ResponseFormatter";
import { Request, Response } from "express";
import { JsonDB } from "repositories/history-repository/JsonDB";

export async function getHistory(req: Request, res: Response): Promise<void> {
    const db = new JsonDB('./src/data/history.json')
    const history = await db.getAll()
    const responseJSON = new ResponseFormatter({ data: { history } }).json()
    res.send(responseJSON)
}