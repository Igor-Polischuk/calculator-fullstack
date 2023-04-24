import { ErrorType } from "./error-type"

export interface IError {
    message: string
    payload?: {
        currentExpressionSnapshot?: string
        errorPlace?: IErrorRange[]
    }
}

export interface IAppError {
    type: ErrorType
    errors: IError[]
}

export interface IErrorRange {
    from: number
    to: number
}
