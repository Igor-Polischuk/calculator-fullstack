import { AppError } from '@utils/AppErrors/AppError';
import { ResponseFormatter } from '@utils/ResponseFormatter';
import { NextFunction, Request, Response } from 'express';
import { logger } from 'common/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const meta = {
        url: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        message: err.message,
        stack: err.stack,
    }

    logger.error('Error occurred', { meta })

    const error = AppError.getErrorFrom(err);

    const responseFormat = new ResponseFormatter({ error }).json();
    res.status(error.status).send(responseFormat);
};