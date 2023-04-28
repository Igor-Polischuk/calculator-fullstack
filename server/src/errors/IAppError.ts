import { ErrorType } from "./error-type.js"

export interface IAppError {
    status: number
    message: string
    type: ErrorType
}
