import { AppError } from '@errors/AppError';
import { ResponseFormatter } from '@utils/ResponseFormatter';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const error = AppError.getErrorFrom(err);
    const responseFormat = new ResponseFormatter({ error }).json();
    res.status(error.status).send(responseFormat);
};