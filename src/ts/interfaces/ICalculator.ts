import { IObserver, ISubscriber } from "./Observer";

export interface ICalculatorModel {
    expressionChanel: IObserver
    resultChanel: IObserver
    setResult: (result: number) => void
    setExpression: (result: number) => void
}

export interface ICalculatorView extends ISubscriber {}

export interface ICalculatorController extends ISubscriber {}
