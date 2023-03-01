import { CalculatorObserverEvents } from "../calculator-events";
import { Observer } from "@utilities/Observer/Observer";
import { AllowedEvents, ICalculatorModel } from "../types/ICalculator";


export class CalculatorModel extends Observer<AllowedEvents> implements ICalculatorModel{
    private result: number | null = null;
    private expression: string | null = null;

    setResult(res: number) {
        this.result = res;
        this.notifyAll(CalculatorObserverEvents.RESULT, res)
    }

    setExpression(expression: string) {
        this.expression = expression;
        this.notifyAll(CalculatorObserverEvents.EXPRESSION, expression)
    }
}