import { ErrorType } from "./error-type"

export interface IAppError {
    status: number
    message: string
    type: ErrorType
}
