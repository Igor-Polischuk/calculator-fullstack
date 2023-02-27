import { Observer } from "@components/Observer";
import { IObserverConfig } from "@customTypes/IObserver";

export interface ICalculatorObserverConfig extends IObserverConfig {
    resultObserver: Observer<number>;
    expressionObserver: Observer<string>;
}

export const calculatorObserversConfig: ICalculatorObserverConfig = {
    resultObserver: new Observer<number>(),
    expressionObserver: new Observer<string>(),
};