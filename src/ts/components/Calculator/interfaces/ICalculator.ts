import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../calculator-model-event";

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number;
    [CalculatorModelEvent.ExpressionChanged]: string;
    [CalculatorModelEvent.ErrorChanged]: IRuntimeError | IValidationError[] | IUnexpectedError
};

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: IRuntimeError | IValidationError[] | IUnexpectedError) => void
    getExpression: () => string | null
}

export type errorsType = IValidationError[] | IRuntimeError | IUnexpectedError

export interface IOperation {
    readonly reg: RegExp
    calculate: (...args: number[]) => number
    checkException: (numbers: number[], errorExpression?: string) => void
    readonly priority: number
    readonly text?: string
}

export type ICalculatorConfig = Record<string, IOperation>

export interface IValidationError {
    message: string
    errorPlace: IErrorRange[]
}

export interface IRuntimeError {
    message: string
    currentExpressionSnapshot: string
}

export interface IUnexpectedError {
    message: string
}

export interface IErrorRange {
    from: number
    to: number
}

export interface ICalculatorView { }

export interface ICalculatorController { }
