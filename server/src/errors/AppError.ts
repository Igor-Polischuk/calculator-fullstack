import { IAppError } from "./IAppError";
import { ErrorType } from "./error-type";

const DEFAULT_MESSAGE = 'Unexpected error while execution'

interface IAppErrorParams {
    status?: number
    message?: string
    type?: ErrorType
}

export class AppError implements IAppError {
    status: number
    message: string
    type: ErrorType;

    constructor(params?: IAppErrorParams) {
        this.status = params?.status || 500
        this.message = params?.message || DEFAULT_MESSAGE
        this.type = params?.type || ErrorType.ServerError
    }

    static getErrorFrom(error: unknown) {
        if (error instanceof AppError) {
            return error
        }

        return new AppError({
            status: 500,
            type: ErrorType.ServerError,
        })
    }
}