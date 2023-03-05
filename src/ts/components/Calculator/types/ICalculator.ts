import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorObserverEvent } from "../calculator-event";

export type AllowedEvents = {
    [CalculatorObserverEvent.Result]: number;
    [CalculatorObserverEvent.Expression]: string;
};

export interface ICalculatorModel extends IObserver<AllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
}

export interface IAction {
    readonly priority: number;
    doAction: (expression: string) => string;
}

export interface ICalculatorCongig {
    [action: string]: IAction
}

export interface ICalculatorView { }

export interface ICalculatorController { }
