import { ResponseFormatter } from "@utils/ResponseFormatter";
import { NextFunction, Request, Response } from "express";

export function responseHandler(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        try {
            const result = await originalMethod.call(this, req, res, next);

            const responseFormat = new ResponseFormatter({ data: result }).json();
            res.send(responseFormat);
        } catch (error) {
            next(error);
        }
    }

    return descriptor;
}