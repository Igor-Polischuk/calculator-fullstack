import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../calculator-model-event";
import { ICalculationErrors, IError } from "./IErrors";

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number;
    [CalculatorModelEvent.ExpressionChanged]: string;
    [CalculatorModelEvent.ErrorChanged]: ICalculationErrors
};

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: ICalculationErrors) => void
    getExpression: () => string | null
}

export interface IOperation {
    readonly reg: RegExp
    calculate: (...args: number[]) => number
    checkException: (numbers: number[], errorExpression?: string) => void
    readonly priority: number
    readonly text?: string
}

export type ICalculatorConfig = Record<string, IOperation>

export interface ICalculatorView { }

export interface ICalculatorController { }
