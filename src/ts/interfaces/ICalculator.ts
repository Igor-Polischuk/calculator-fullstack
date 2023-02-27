import { IObserver, ISubscriber, IObserverConfig } from "./IObserver";

export interface ICalculatorModel {
    observers: IObserverConfig
    setResult: (result: number) => void
    setExpression: (expression: string) => void
}

export interface ICalculatorView extends ISubscriber {}

export interface ICalculatorController extends ISubscriber {}
