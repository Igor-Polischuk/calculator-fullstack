import { IObserver } from "@utilities/Observer/IObserver"

export type AllowedEvents = {
    result: number;
    expression: string;
};

export interface ICalculatorModel extends IObserver<AllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
}

export interface ICalculatorView {}

export interface ICalculatorController {}
