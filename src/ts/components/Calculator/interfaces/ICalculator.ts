import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorObserverEvent } from "../calculator-event";

export type AllowedEvents = {
    [CalculatorObserverEvent.Result]: number;
    [CalculatorObserverEvent.Expression]: string;
    [CalculatorObserverEvent.Error]: IError[]
};

export interface ICalculatorModel extends IObserver<AllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: IError[]) => void
}

export interface IOperation {
    readonly reg: RegExp
    calculate: (...args: number[]) => number
    checkException: (numbers: number[]) => void
    readonly priority: number
}

export type ICalculatorConfig = Record<string, IOperation> 

export interface IError {
    message: string
    meta: {
        errorIndex?: number,
        description?: string
    }    
}

export interface ICalculatorView { }

export interface ICalculatorController { }
