import { IExceptionObj } from "../exceptions"

export interface IOperation {
    readonly reg: RegExp
    calculate: (...args: number[]) => number
    checkException: (numbers: number[], errorExpression?: string) => void
    readonly priority: number
    readonly text?: string
}

export interface IOperationsBaseParams {
    calculate: (...args: number[]) => number
    exceptionHandler?: IExceptionObj[]
    text?: string
}

export interface IOperationParams extends IOperationsBaseParams {
    reg: RegExp
    priority: number
}

export interface IMathFunctionParams extends IOperationsBaseParams {
    name: string
}

export interface IConstantParams extends Pick<IOperationsBaseParams, 'text'> {
    name: string
    value: number
    reg?: RegExp
}

