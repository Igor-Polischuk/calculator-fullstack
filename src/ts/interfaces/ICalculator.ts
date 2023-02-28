import { IObserver } from "./IObserver"


export interface ICalculatorModel extends IObserver {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
}

export interface ICalculatorView {}

export interface ICalculatorController {}
