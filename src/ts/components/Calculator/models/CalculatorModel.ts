import { IError } from './../types/ICalculator';
import { CalculatorObserverEvent} from "../calculator-event";
import { Observer } from "@utilities/Observer/Observer";
import { AllowedEvents, ICalculatorModel } from "../types/ICalculator";


export class CalculatorModel extends Observer<AllowedEvents> implements ICalculatorModel{
    private result: number | null = null;
    private expression: string | null = null;
    private error: IError[] = [];

    setResult(res: number) {
        this.result = res;
        this.error = []
        this.notifyAll(CalculatorObserverEvent.Result, res)
    }

    setExpression(expression: string) {
        this.expression = expression;
        this.notifyAll(CalculatorObserverEvent.Expression, expression)
    }

    setError(errors: IError[]){
        this.error = errors
        this.result = null
        this.notifyAll(CalculatorObserverEvent.Error, errors)
    }
}