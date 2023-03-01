import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorObserverEvents } from "../calculator-events";

export type AllowedEvents = {
    [CalculatorObserverEvents.RESULT]: number;
    [CalculatorObserverEvents.EXPRESSION]: string;
};

export interface ICalculatorModel extends IObserver<AllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
}

export interface ICalculatorView {}

export interface ICalculatorController {}
