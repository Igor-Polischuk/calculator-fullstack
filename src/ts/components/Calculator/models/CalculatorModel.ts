import { ModelAllowedEvents, ICalculatorModel, } from '../interfaces/ICalculator';
import { CalculatorModelEvent } from "../calculator-model-event";
import { Observer } from "@utilities/Observer/Observer";
import { IError } from '../interfaces/IErrors';


export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null;
    private expression: string | null = null;
    private error: IError | IError[] = [];

    setResult(res: number) {
        this.result = res
        this.error = []
        this.notifyAll(CalculatorModelEvent.ResultChanged, res)
    }

    setExpression(expression: string) {
        this.expression = expression
        this.error = []
        this.notifyAll(CalculatorModelEvent.ExpressionChanged, expression)
    }

    setError(errors: IError | IError[]) {
        this.error = errors
        this.result = null
        this.notifyAll(CalculatorModelEvent.ErrorChanged, errors)
    }

    getExpression() {
        return this.expression
    }
}