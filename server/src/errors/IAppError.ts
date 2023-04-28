import { ErrorType } from "./error-type.js"

export interface IAppError {
    status: number
    message: string
    type: ErrorType
}

export interface IValidationError {
    message: string
    errorPlace: IErrorRange
}


export interface IError {
    message: string
    payload?: {
        currentExpressionSnapshot?: string
        errorPlace?: IErrorRange[]
    }
}

export interface IErrorRange {
    from: number
    to: number
}
