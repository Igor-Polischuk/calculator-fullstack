import { IExceptionObj } from "../exceptions"

export interface IOperation {
    readonly calculate: (...args: number[]) => number
    readonly checkException: (numbers: number[], errorExpression?: string) => void
    readonly reg: RegExp
    readonly priority: number
    readonly type: OperationType
    readonly text?: string
}

export enum OperationType {
    Operation,
    MathFunction,
    Constant
}

export interface IOperationParams {
    reg: RegExp
    priority: number
    calculate: (...args: number[]) => number
    exceptionHandler?: IExceptionObj[]
    text?: string
    type?: OperationType
}


