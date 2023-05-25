import { AppError } from "@utils/AppErrors/AppError";
import { ResponseFormatter } from "@utils/ResponseFormatter";
import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export function validationMiddleware(validations: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const error = AppError.getErrorFrom(errors.array()[0].msg)

        const JSONResponse = new ResponseFormatter({
            status: error.status,
            error
        }).json()

        res.status(error.status).send(JSONResponse);
    };
};