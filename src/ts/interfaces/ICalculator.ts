import { IObserver, ISubscriber } from "./Observer";

export interface ICalculatorModel {
    expressionChanel: IObserver
    resultChanel: IObserver
    setResult: (result: number) => void
    setExpression: (expression: string) => void
}

export interface ICalculatorView extends ISubscriber {}

export interface ICalculatorController extends ISubscriber {}
