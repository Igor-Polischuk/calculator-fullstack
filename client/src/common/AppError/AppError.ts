import { IAppError, IAppErrorParams, IExpressionValidationError } from "./IAppError";
import { ErrorType } from "./error-type"



export class AppError implements IAppError {
    message: string
    type: ErrorType;
    failedValidations: IExpressionValidationError[]

    constructor(params?: IAppErrorParams) {
        this.message = params?.message || 'Unexpected error'
        this.type = params?.type || ErrorType.UnexpectedError
        this.failedValidations = params?.failedValidations || []
    }

    static getErrorFrom(error: any): AppError {
        if (error instanceof AppError) {
            return error
        }

        return new AppError({
            type: error.type || ErrorType.UnexpectedError,
            message: error.message,
            failedValidations: error.failedValidations || []
        })
    }
}
