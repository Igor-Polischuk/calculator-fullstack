import { ICalculatorModel } from "@customTypes/ICalculator";
import { ICalculatorObserverConfig, calculatorObserversConfig } from "./observers.config";

type ObserverDataType<K extends keyof ICalculatorObserverConfig> = K extends 'resultObserver'
    ? number
    : K extends 'expressionObserver'
    ? string
    : never;

export class CalculatorModel implements ICalculatorModel {
    public observers: ICalculatorObserverConfig = calculatorObserversConfig;
    private result: number | null = null;
    private expression: string | null = null;

    setResult(res: number) {
        this.result = res;
        this.notifySubscribers('resultObserver', res);
    }

    setExpression(expression: string) {
        this.expression = expression;
        this.notifySubscribers('expressionObserver', expression);
    }

    private notifySubscribers<K extends keyof ICalculatorObserverConfig>(
        observerName: K,
        data: ObserverDataType<K>
    ) {
        this.observers[observerName].notifyAll(data);
    }
}
