import { IExceptionObj } from "../exceptions";
import { IError } from "exceptions/IErrors";
import { ErrorType } from "exceptions/error-type";
import { AppError } from "exceptions/AppError";
import { IOperation, IOperationParams, OperationType } from "./IOperations";


export class Operation implements IOperation {
    readonly reg: RegExp
    readonly calculate: (...args: number[]) => number
    readonly priority: number
    readonly text: string | undefined
    readonly type: OperationType

    private exceptionHandler: IExceptionObj[] = []

    constructor(params: IOperationParams) {
        this.reg = params.reg
        this.calculate = params.calculate
        this.exceptionHandler = params.exceptionHandler || []
        this.type = params.type || OperationType.Operation
        this.priority = params.priority
        this.text = params.text
    }

    checkException(numbers: number[], errorExpression?: string): void {
        if (this.exceptionHandler.length === 0) {
            return
        }

        const whereMessage = errorExpression ? `in ${errorExpression}` : ''

        this.exceptionHandler.forEach(exception => {
            const isException = exception.checkException(...numbers)

            if (isException) {
                const error: IError = {
                    message: `Runtime error: ${exception.exceptionMessage} ${whereMessage}`,
                    payload: {
                        currentExpressionSnapshot: errorExpression
                    }
                }

                throw new AppError({
                    type: ErrorType.RuntimeError,
                    errors: [error]
                })
            }
        })
    }
}
