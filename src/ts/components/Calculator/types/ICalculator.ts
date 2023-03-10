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

export interface IAction {
    readonly priority: number;
    doAction: (expression: string) => {
        evaluatedExpression: string
        result: number
    };
}

export interface ICalculatorConfig {
    [action: string]: IAction
}

export interface IError {
    message: string
    where: number | undefined
}

export interface ICalculatorView { }

export interface ICalculatorController { }
