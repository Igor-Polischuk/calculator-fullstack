import { ErrorType } from "./error-type"

export interface IAppError {
    message: string
    type: ErrorType
    failedValidations: IExpressionValidationError[]
}

export interface IExpressionValidationError {
    message: string
    errorPlace: IErrorRange[]
}

export interface IErrorRange {
    from: number
    to: number
}

interface IAppErrorParams {
    message?: string
    type?: ErrorType
    failedValidations?: IExpressionValidationError[]
}

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
        console.log(error.failedValidations);

        return new AppError({
            type: error.type || ErrorType.UnexpectedError,
            message: error.message,
            failedValidations: error.failedValidations || []
        })
    }
}
