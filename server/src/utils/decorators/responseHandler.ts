import { ResponseFormatter } from "@utils/ResponseFormatter";
import { NextFunction, Request, Response } from "express";

/**
 * 
 * @param target 
 * @param key 
 * @param descriptor 
 * 
 * @description a decorator for controller methods that sends the value to the client that the function we are decorating will return. Also, in case of an error, it will be caught and called errorHandler middleware.
 */
export function responseHandler(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
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