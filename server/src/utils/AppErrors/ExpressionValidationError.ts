import { AppError } from "@utils/AppErrors/AppError";
import { ErrorType } from "@utils/AppErrors/error-type";

export interface IExpressionValidationError {
    message: string
    errorPlace: IErrorRange[]
}

export interface IErrorRange {
    from: number
    to: number
}

export class ExpressionValidationError extends AppError {
    readonly failedValidations: IExpressionValidationError[]

    constructor(failedValidations: IExpressionValidationError[]) {
        super({
            message: 'Expression has incorrect format',
            type: ErrorType.ValidationError,
            status: 400
        })

        this.failedValidations = failedValidations
    }
}