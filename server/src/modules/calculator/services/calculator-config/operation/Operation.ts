import { ErrorFactory } from "@utils/AppErrors/ErrorFactory";
import { IExceptionObj } from "../exceptions";
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

    checkException(numbers: number[], currentOperationExpression: string): void {
        if (this.exceptionHandler.length === 0) {
            return
        }

        this.exceptionHandler.forEach(exception => {
            const isException = exception.checkException(...numbers)

            if (isException) {
                throw ErrorFactory.CalculationError(exception.exceptionMessage, currentOperationExpression)
            }
        })
    }
}
