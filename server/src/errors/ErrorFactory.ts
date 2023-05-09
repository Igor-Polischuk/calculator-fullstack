import { AppError } from "./AppError";
import { ErrorType } from "./error-type";

export const ErrorFactory = {
    ServerError: (): AppError => {
        return new AppError({ message: 'Internal server error', status: 500, type: ErrorType.ServerError })
    },
    BadRequestError: (): AppError => {
        return new AppError({ message: 'Bad request', status: 400, type: ErrorType.BadRequestError })
    },
    MissingParameterError: (missingParam: string, missingParamType: 'query' | 'body'): AppError => {
        return new AppError({
            message: `Missing required ${missingParamType} parameter: ${missingParam}`,
            status: 400,
            type: ErrorType.MissingParameter
        })
    },
    CalculationError: (exceptionName: string, exceptionPlace: string): AppError => {
        return new AppError({
            message: `Expression contains ${exceptionName} in ${exceptionPlace}`,
            status: 422,
            type: ErrorType.RuntimeError
        })
    }
}