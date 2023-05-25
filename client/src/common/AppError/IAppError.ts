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

export interface IAppErrorParams {
    message?: string
    type?: ErrorType
    failedValidations?: IExpressionValidationError[]
}